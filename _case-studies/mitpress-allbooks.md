---
layout: case-study
weight: -2
project_title: MIT Press AllBooks Importer
slug: mitpress-allbooks
tags: drupal module-development php testing
featured_tags: [Drupal, Module Development, PHP, Testing]
services: development
client_name: MIT Press
client_url: "http://mitpress.mit.edu"
client_description: |
  The MIT Press is the only university press in the United States whose list is based in science and technology. MIT Press publishes about 200 new books a year and over 30 journals.
client_quote: mitpress-jf
client_dates: 2014 - present
project_description: |
  When the MIT Press needed to bring new product information into their website from their back-end database, Savas Labs came through with an automated importer module that did the job in a flexible and extensible way.
project_highlights: [Drupal 6, Custom module development, Drupal admin interface customization, Unit testing]
project_objective: |
  As new books come to press, the MIT Press needs to keep information on titles and authors on their client-facing website synced with the data in their back-end data store. To replace their quarterly manual import process, the Press needed an automated import solution to seamlessly import new and updated data without interrupting the live site.
project_process: |
  We evaluated the existing import modules for Drupal 6 and settled on developing a custom Drupal module to validate and enqueue data exports from the AllBooks database, then use an object-oriented framework to update and/or create Drupal nodes based on the imported data. We also developed a reporting framework and a suite of tests to ensure that the importer is working according to spec.
project_results: |
  Our importer processed MIT Press's next import of new titles smoothly with a minimum of manual input. We've continued to work with the Press to further customize field mappings and import processes as new fields come online in the AllBooks database, and to handle new kinds of imports, including eBooks.
services_provided: |
  - [Drupal custom module development](/services/development)
  - [Unit testing](/services/development)
technologies_used: |
  - [Drupal 6](/blog/tag/drupal/)
  - [PHPUnit](/blog/tag/testing/)
client_logo: "/assets/img/work/logos/mitpress-logo.png"
client_logo_width: "110px"
client_logo_height: "107px"
client_logo_light: "/assets/img/work/logos/mitpress-logo-eggshell.png"
redirect_from:
  - /work/allbooks-case-study/
---
