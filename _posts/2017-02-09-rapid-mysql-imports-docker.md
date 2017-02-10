---
layout: post
title: "Dramatically improve MySQL database import time on Docker stacks"
date: 2017-02-09
author: Kosta Harlan
tags: drupal drupal-planet docker
summary: "How to dramatically improve MySQL database import time on Dockerized Drupal stacks"
featured_image: "/blog/sea-ocean-boats-port.jpg"
featured_image_alt: "Docker, ships, the sea, etc"
featured_image_height: "983px"
featured_image_width: "1474px"
drupal_planet_summary: |
  A tutorial to show how you can use data volume restore for MySQL on Dockerized Drupal stacks to dramatically speed up import times, and notes on how to integrate this with your development and continuous integration practices.
---

If you're a Drupal developer, the process of (re)importing a seed database locally or for automated testing builds is something you do many times per day. If you're using Docker for your local development or continuous integration environments, here's a tip to dramatically speed up the import of databases, especially large ones.

## The usual way

The typical way to import a database is with using the `mysql` command to process a SQL dump file: 

``` bash
mysql -u{some_user} -p{some_pass} {database_name} < /path/to/database.sql
```

For bonus points, you could use a tool like [`pv`](https://www.ivarch.com/programs/pv.shtml) to see the progress of the import and an estimated time for completion: 

``` bash
pv /path/to/database.sql | mysql -u{some_user} -p {some_pass} {database_name}
```

On large databases, though, this can be a slow process. If we look at a database dump SQL file, we can see why. For example, a 19 MB database dump file I am using in one of my test cases further on in this post contains these instructions:

``` sql
--
-- Table structure for table `block_content`
--

DROP TABLE IF EXISTS `block_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block_content` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revision_id` int(10) unsigned DEFAULT NULL,
  `type` varchar(32) CHARACTER SET ascii NOT NULL COMMENT 'The ID of the target entity.',
  `uuid` varchar(128) CHARACTER SET ascii NOT NULL,
  `langcode` varchar(12) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `block_content_field__uuid__value` (`uuid`),
  UNIQUE KEY `block_content__revision_id` (`revision_id`),
  KEY `block_content_field__type__target_id` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='The base table for block_content entities.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block_content`
--

LOCK TABLES `block_content` WRITE;
/*!40000 ALTER TABLE `block_content` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `block_content` VALUES (1,1,'basic','a9167ea6-c6b7-48a1-ac06-6d04a67a5d54','en'),(2,2,'basic','2114eee9-1674-4873-8800-aaf06aaf9773','en'),(3,3,'basic','855c13ba-689e-40fd-9b00-d7e3dd7998ae','en'),(4,4,'basic','8c68671b-715e-457d-a497-2d38c1562f67','en'),(5,5,'basic','bc7701dd-b31c-45a6-9f96-48b0b91c7fa2','en'),(6,6,'basic','d8e23385-5bda-41da-8e1f-ba60fc25c1dc','en'),(7,7,'basic','ea6a93eb-b0c3-4d1c-8690-c16b3c52b3f1','en'),(8,8,'basic','3d314051-567f-4e74-aae4-a8b076603e44','en'),(9,9,'basic','2ef5ae05-6819-4571-8872-4d994ae793ef','en'),(10,10,'basic','3deaa1a9-4144-43cc-9a3d-aeb635dfc2ca','en'),(11,11,'basic','d57e81e8-c613-45be-b1d5-5844ba15413c','en');
/*!40000 ALTER TABLE `block_content` ENABLE KEYS */;
UNLOCK TABLES;
commit;
```

When I pipe the contents of the MySQL database dump to the `mysql` command, the `mysql` client processes each of these instructions sequentially in order to (1) create the structure for each table defined in the file and (2) populate the database with data from the SQL dump.

What happens when `mysql` finished processing the SQL dump? The database contents live in `/var/lib/mysql/{database}`, so for example for the `block_content` table mentioned above there are two files called `block_content.frm` and `block_content.ibd` in `/var/lib/mysql/{database}/`. The `/var/lib/mysql` directory will also contain a number of other directories and files related to the configuration of the MySQL server.

Now, suppose that, instead of sequentially processing the SQL instructions contained in a database dump file, we were able to provide developers with a snapshot of the `/var/lib/mysql` directory for a given Drupal site. Would this be faster than the traditional database import methods?

The answer is, yes, very much so!

### Two test cases 

The table below shows the results of two test cases, one using a 19 MB database file and the other using a 4.7 GB database.

| Method                | Database size | Time to drop tables and restore (seconds) |
| :-------              | ------:       |                                  -------: |
| Traditional `mysql`   | 19 MB         |                                       128 |
| Docker volume restore | 19 MB         |                                        11 |
| Traditional `mysql`   | 4.7 GB        |                                       606 |
| Docker volume restore | 4.7 GB        |                                        85 |

In other words, the MySQL data volume import completes, on average, in about 11% of the time that a traditional MySQL dump import would take!

Since, as the saying goes, a GIF is worth a thousand words, compare these:

#### Data volume restore

![Docker MySQL volume restore](/assets/img/blog/docker-mysql-volume.gif)

#### Traditional MySQL database dump import

![Docker MySQL traditional database import](/assets/img/blog/docker-mysql-traditional.gif)

## Use MySQL volume for database imports with Docker

Here's how the process works. Suppose you have a Docker stack with a web container and a database container, and that the database container has data in it already (your site is up and running locally). Assuming a database container name of `drupal_database`, to generate a volume for the MySQL `/var/lib/mysql` contents of the database container, you'd run these commands:

``` bash
docker stop drupal_database
docker run --rm --volumes-from dupal_database carinamarina/backup backup \
--source /var/lib/mysql/ --stdout --zip > db-data-volume.tar.gz
```

With the 4.7 GB sample database above, this process takes 239 seconds and results in 702 MB compressed file.

We're making use of the [`carinamarina/backup`](https://getcarina.com/docs/tutorials/backup-restore-data/) image produced by Rackspace to create an archive of the database files.

You can then distribute this file to your colleagues (we use Amazon S3), or make use of it in continuous integration builds (more on that below), using these commands:

``` bash
if [ ! -f db/db-data-volume.tar.gz ]; then aws s3 cp \
s3://{your-bucket}/mysql-data-volume/db-data-volume.tar.gz db-data-volume.tar.gz; fi
docker stop drupal_database
docker run --rm --volumes-from drupal_database alpine:3.3 rm -rf /var/lib/mysql/*
docker run --rm --interactive --volumes-from drupal_database \
carinamarina/backup restore --destination /var/lib/mysql/ --stdin \
--zip < db-data-volume.tar.gz
docker start drupal_database
```

So, not too complicated, but it will require a change in your processes for generating seed databases to distribute to your team for local development, or for CI builds - instead of using `mysqldump` to create the seed database file, you'll need to use the `carinamarina/backup` image to create the `.tar.gz` file for distribution; and instead of `mysql {database} < database.sql` you'll use `carinamarina/backup` to restore the data volume. In our team's view this is a small cost for the enormous gains in database import time, which in turn boost productivity (faster CI builds and refreshes of local development environments).

## Bonus points: integrate this process with your continuous integration workflow

The above steps can be manually performed by a technical lead on the project, who is responsible for generating and distributing the MySQL data volume to team members and your testing infrastructure.

But we can get further productivity gains by automating this process completely with [Travis CI](https://www.travis-ci.com) and GitHub hooks. In outline, here's what this process looks like:

### 1. Generate a new seed database SQL dump after production deployments

We use [Fabric](http://www.fabfile.org) for deploying to staging and production. When we deploy to production (production is not on a Docker stack), our post-deployment tasks include generating a traditional MySQL database dump and copying this to Amazon S3:

``` python
def update_seed_db():
    run('drush -r %s/www/web sql-dump \
    --result-file=/tmp/$(date +%%Y-%%m-%%d)--post-deployment.sql --gzip \
    --structure-tables-list=cache,cache_*,history,search_*,sessions,watchdog' \
    % env.code_dir)
    run('/usr/local/bin/aws s3 cp /tmp/$(date +%Y-%m-%d)--post-deployment.sql.gz \
    s3://{bucket-name}/seed-database/database.sql.gz --sse')
    run('rm /tmp/$(date +%Y-%m-%d)--post-deployment.sql.gz')
```

### 2. When work is merged into develop, create a new MySQL data volume archive

We use [`git flow`](http://developers.savaslabs.com/en/latest/git.html#basic-git-workflow-git-flow) on just about all of our Drupal projects. Whenever a feature branch is merged into `develop`, we update the MySQL data volume archive dump for use in Travis CI tasks and local development. First, there is a specification in our `.travis.yml` file that calls a deployment script:

``` yaml
deploy:
  provider: script
  script:
    - resources/scripts/travis-deploy.sh
  skip_cleanup: true
  on:
    branch: develop
```

And the `travis-deploy.sh` script:

``` bash
#!/usr/bin/env bash

set -e

make import-seed-db
make export-mysql-data
aws s3 cp db-data-volume.tar.gz \
s3://{bucket-name}/mysql-data-volume/db-data-volume.tar.gz --sse
```

This script: (1) imports the traditional MySQL seed database file from production, and then (2) creates a MySQL data volume archive. (We use a [`Makefile`](https://github.com/savaslabs/docker-drupal-template/blob/master/Makefile) for simplifying some of the common site provisioning tasks for developers and our CI systems; more on that in another post!)

### 3. Pull requests and local development make use of the MySQL data volume archive

Now, whenever developers want to refresh their local environment by wiping the existing database and re-importing the seed database, or, when a Travis CI build is triggered by a GitHub pull request, these processes can make use of an up-to-date MySQL data volume archive file which is super fast to restore!

## Conclusion

If you are using Docker for your development stack, then this is a compelling addition to your toolkit as it will impressively speed up MySQL imports and boost productivity. If you're not using Docker for development/testing, this alone isn't probably enough to sway you, but I hope it is a convincing demonstration of some of the exciting possibilities that are easily achieved with the Docker architecture.
