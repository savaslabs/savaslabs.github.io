---
layout: case-study
project_title: MIT Press AllBooks Importer
client_name: MIT Press
client_url: "http://mitpress.mit.edu"
client_description: |

client_quote: |
client_quote_author: 
client_dates: 2014 - present
project_description: |
    When MIT Press needed to bring new product information into their website from their back-end database, Savas came through with an automated importer module that did the job in a flexible and extensible way.
project_objective: |
    As new books come to press, MIT Press needed to keep the information on titles and authors on their client-facing website synced with the data in their back-end data store. Previously, the Press had been doing a quarterly manual import process. They needed an automated import solution which would seamlessly import new and updated data while preserving the existing client-facing site.
project_process: |
  Savas evaluated the existing import modules for Drupal 6, and settled on developing a custom Drupal module which validates and enqueue data exports from the AllBooks database, and then uses an object-oriented framework to update and/or create Drupal nodes based on the imported data. We also developed a reporting framework and a suite of tests which ensure that the importer is working according to spec.
project_results: |
  Our importer processed MIT Press's next import of new titles smoothly with a minimum of manual input. We've continued to work with the Press to further customize field mappings and import processes as new fields come online in the AllBooks database, and to handle new kinds of imports, including eBooks.
services_provided: |
  - [Drupal custom module development](/blog/tag/drupal/)
  - Unit testing
technologies_used: |
  - Drupal 6
  - PHPUnit
  - Object-Oriented Programming
client_logo: "/assets/img/work/allbooks-case-study/mitpress-logo.png"
client_hero_image: "/assets/img/work/allbooks-case-study/allbooks-importer-diagram.png"
project_objective_image: "/assets/img/work/allbooks-case-study/allbooks-class-diagram.png"
project_objective_image_alt: "Class hierarchy of importer objects."
project_process_image: "/assets/img/work/allbooks-case-study/allbooks-report-interface.png"
project_process_image_alt: "Reporting interface shows import results for site administrators."
project_results_image: "/assets/img/work/allbooks-case-study/allbooks-node-display.png"
project_results_image_alt: "A title node, with content populated by the importer."

---
