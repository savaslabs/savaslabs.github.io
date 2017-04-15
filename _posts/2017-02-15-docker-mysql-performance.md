---
layout: post
title: "Dramatically Improve MySQL Import Performance with Docker"
date: 2017-02-15
author: Kosta Harlan and Chris Russo
primary_author: Kosta Harlan
tags: drupal drupal-planet docker continuous-integration performance productivity
services: development
summary: "How to dramatically improve MySQL database import performance on Drupal with Docker stacks"
featured_image: "/blog/sea-ocean-boats-port.jpg"
featured_image_alt: "Docker, ships, the sea"
featured_image_height: "983px"
featured_image_width: "1474px"
drupal_planet_summary: |
  A tutorial to show how you can use data volume restore for MySQL on Drupal Docker stacks to dramatically improve import performance with notes on how to integrate this with your development and continuous integration workflow.
---

We use [Docker](https://www.docker.com/) for our development environments because it helps us adhere to our [commitment to excellence](/company/mission-and-values/#excel). It ensures an identical development platform across the team while also achieving parity with the production environment. These efficiency gains (among others we'll share in an ongoing [Docker series](/blog/tag/docker/)) over traditional development methods enable us to spend less time on setup and more time building amazing things.

Part of our workflow includes a mechanism to establish and update the [seed database](https://en.wikipedia.org/wiki/Database_seeding) which we use to load near-real-time production content to our development environments as well as our [automated testing](/blog/tag/testing/) infrastructure. We've found it's best to have real data throughout the development process, rather than using stale or dummy data which runs the risk of encountering unexpected issues toward the end of a project. One efficiency boon we've recently implemented and are excited to share is a technique that dramatically speeds up database imports, especially large ones. This is a big win for us since we're often importing large databases multiple times a day on a project. In this post we'll look at:

- how much faster data volume imports are compared to traditional database dumps piped to `mysql`
- how to set up a data volume import with your Drupal Docker stack
- how to tie in this process with your local and continuous integration environments

## The _old_ way

The way we historically imported a database was to pipe a SQL database dump file into the MySQL command-line client:

``` bash
mysql -u{some_user} -p{some_pass} {database_name} < /path/to/database.sql
```

An improvement upon the default method above which we've been using for some time allows us to monitor import progress utilizing the [`pv`](https://www.ivarch.com/programs/pv.shtml) command. Large imports can take many minutes, so having insight into how much time remains is helpful to our workflow:

``` bash
pv /path/to/database.sql | mysql -u{some_user} -p {some_pass} {database_name}
```

On large databases, though, MYSQL imports can be slow. If we look at a database dump SQL file, we can see why. For example, a 19 MB database dump file we are using in one of our test cases further on in this post contains these instructions:

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

When we pipe the contents of the MySQL database dump to the `mysql` command, the client processes each of these instructions sequentially in order to (1) create the structure for each table defined in the file, (2) populate the database with data from the SQL dump and (3) do post-processing work like create indices to ensure the database performs well. The example here processes pretty quickly, but if your site has a lot of historic content, as many of our clients do, then the import process can take enough time that it throws a wrench in our rapid workflow![^1]

What happens when `mysql` finishes importing the SQL dump file? The database contents (_often_) live in `/var/lib/mysql/{database}`, so for example for the `block_content` table mentioned above, assuming you're using the typically preferred InnoDB storage engine, there are two files called `block_content.frm` and `block_content.ibd` in `/var/lib/mysql/{database}/`. The `/var/lib/mysql` directory will also contain a number of other directories and files related to the configuration of the MySQL server.

Now, suppose that instead of sequentially processing the SQL instructions contained in a database dump file, we were able to provide developers with a snapshot of the `/var/lib/mysql` directory for a given Drupal site. Could this swap faster than the traditional database import methods? Let's have a look at two test cases to find out!

### MySQL import test cases

The table below shows the results of two test cases, one using a 19 MB database and the other using a 4.7 GB database.

| Method                     | Database size | Time to drop tables and restore (seconds) |
| :-------                   | ------:       |                                  -------: |
| Traditional `mysql`        | 19 MB         |                                       128 |
| Docker data volume restore | 19 MB         |                                        11 |
| Traditional `mysql`        | 4.7 GB        |                                       606 |
| Docker data volume restore | 4.7 GB        |                                        85 |

In other words, the MySQL data volume import completes, on average, in about 11% of the time, or 9 times faster, than a traditional MySQL dump import would take!

Since a GIF is worth a thousand words, compare these two processes side-by-side (both are using the same 19 MB source database; the first is using a data volume restore process while the second is using the traditional MySQL import process). You can see that the second process takes considerably longer!

#### Docker data volume restore

<script type="text/javascript" src="https://asciinema.org/a/102770.js" id="asciicast-102770" async data-autoplay="true" data-loop="true" data-theme="solarized-dark"></script>

#### Traditional MySQL database dump import

<script type="text/javascript" src="https://asciinema.org/a/102769.js" id="asciicast-102769" async data-autoplay="true" data-loop="true" data-theme="solarized-dark"></script>

## Use MySQL volume for database imports with Docker

Here's how the process works[^2]. Suppose you have a Docker stack with a web container and a database container, and that the database container has data in it already (your site is up and running locally). Assuming a database container name of `drupal_database`, to generate a volume for the MySQL `/var/lib/mysql` contents of the database container, you'd run these commands:

``` bash
# Stop the database container to prevent read/writes to it during the database
# export process.
docker stop drupal_database
# Now use the carinamarinab/backup image with the `backup` command to generate a
# tar.gz file based on the `/var/lib/mysql` directory in the `drupal_database`
# container.
docker run --rm --volumes-from drupal_database carinamarina/backup backup \
--source /var/lib/mysql/ --stdout --zip > db-data-volume.tar.gz
```

With the 4.7 GB sample database above, this process takes 239 seconds and results in 702 MB compressed file.

We're making use of the [carinamarina/backup](https://getcarina.com/docs/tutorials/backup-restore-data/) image produced by Rackspace to create an archive of the database files.

You can then distribute this file to your colleagues (at Savas Labs, we use [Amazon S3](https://aws.amazon.com/s3/)), or make use of it in continuous integration builds (more on that below), using these commands:

``` bash
# Copy the data volume tar.gz file from your team's AWS S3 bucket.
if [ ! -f db/db-data-volume.tar.gz ]; then aws s3 cp \
s3://{your-bucket}/mysql-data-volume/db-data-volume.tar.gz db-data-volume.tar.gz; fi
# Stop the database container to prevent read/writes during the database
# restore process.
docker stop drupal_database
# Remove the /var/lib/mysql contents from the database container.
docker run --rm --volumes-from drupal_database alpine:3.3 rm -rf /var/lib/mysql/*
# Use the carinamarina/backup image with the `restore` command to extract
# the tar.gz file contents into /var/lib/mysql in the database container.
docker run --rm --interactive --volumes-from drupal_database \
carinamarina/backup restore --destination /var/lib/mysql/ --stdin \
--zip < db-data-volume.tar.gz
# Start the database container again.
docker start drupal_database
```

So, not too complicated, but it will require a change in your processes for generating seed databases to distribute to your team for local development, or for CI builds. Instead of using `mysqldump` to create the seed database file, you'll need to use the `carinamarina/backup` image to create the `.tar.gz` file for distribution. And instead of `mysql {database} < database.sql` you'll use `carinamarina/backup` to restore the data volume.

In our team's view this is a small cost for the enormous gains in database import time, which in turn boosts productivity to the tune of faster CI builds and refreshes of local development environments.

## Further efficiency gains: integrate this process with your continuous integration workflow

The above steps can be manually performed by a technical lead responsible for generating and distributing the MySQL data volume to team members and your testing infrastructure. But we can get further productivity gains by automating this process completely with [Travis CI](https://www.travis-ci.com) and GitHub hooks. In outline, here's what this process looks like:

### 1. Generate a new seed database SQL dump after production deployments

At Savas Labs, we use [Fabric](http://www.fabfile.org) to automate our deployment process. When we deploy to production (not on a Docker stack), our post-deployment tasks generate a traditional MySQL database dump and copy it to Amazon S3:

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

We use [`git flow`](http://developers.savaslabs.com/en/latest/git.html#basic-git-workflow-git-flow) as our collaboration and documentation standard for source code management on our Drupal projects. Whenever a developer merges a feature branch into `develop`, we update the MySQL data volume archive dump for use in Travis CI tasks and local development. First, there is a specification in our `.travis.yml` file that calls a deployment script:

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

This script: (1) imports the traditional MySQL seed database file from production, and then (2) creates a MySQL data volume archive. We use a [Makefile](https://github.com/savaslabs/docker-drupal-template/blob/master/Makefile) to standardize common site provisioning tasks for developers and our CI systems.

### 3. Pull requests and local development make use of the MySQL data volume archive

Now, whenever developers want to refresh their local environment by wiping the existing database and re-importing the seed database, or, when a Travis CI build is triggered by a GitHub pull request, these processes can make use of an up-to-date MySQL data volume archive file which is super fast to restore! This way, we ensure we're always testing against the latest content and configuration, and avoid running into costly issues having to troubleshoot inconsistencies with production.

## Conclusion

We've invested heavily in Docker for our development stack, and this workflow update is a compelling addition to that toolkit since it has substantially sped up MySQL imports and boosted productivity. Try it out in your Docker workflow and we invite comments to field any questions and hear about your successes. Stay tuned for further [Docker](/blog/tag/docker/) updates!

[^1]: It's worth noting that there are [cool projects out there](https://github.com/juampynr/syncdb) for doing parallel imports of a SQL dump file which improve the import experience.

[^2]: Hat tip to Tim Stallmann for taking a proof of concept and incorporating it into a [real-world project](/work/hptn-case-study/), from which many of the code samples here are drawn.

