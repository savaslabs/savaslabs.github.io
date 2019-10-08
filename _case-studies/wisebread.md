---
layout: case-study
featured: 1
weight: -10
project_title: Wisebread
slug: wisebread
tags:
services: development support
featured_tags: [Technical Platform, Support, Security, Content Migration]
client_name: Wisebread
client_url: "https://www.wisebread.com/compare"
client_quote: wisebread
client_description: |
  Wisebread is a community for financial bloggers seeking to educate on financial literacy, planning, and budgeting. With 50,000,000 users, WiseBread’s website offers help with personal finance, life hacks, and advice about buying goods and services.
client_dates: 2010 - Present
project_highlights: [HTTPS, Content Migration, Security, Support]
project_description: |
  Wisebread sought to upgrade their site to create a technical platform for financial content editors that empowers their monthly multi-million dollar ad spends.

  While working with Wisebread we have managed and maintained their (legacy) architecture which includes their Linode servers and the software that runs on them, allowing them to maintain 99.99% uptime, even during significant system upgrades (for example, during Linode server updates to address the Spectre and Meltdown vulnerabilities).

  We’ve also transitioned their site to HTTPS which is a significant effort given the amount of 3rd party content they load on their site.
description: |
  Wisebread sought to upgrade their site to create a technical platform for financial content editors that empowers their monthly multi-million dollar ad spends.

  While working with Wisebread we have managed and maintained their (legacy) architecture which includes their Linode servers and the software that runs on them, allowing them to maintain 99.99% uptime, even during significant system upgrades (for example, during Linode server updates to address the Spectre and Meltdown vulnerabilities).

  We’ve also transitioned their site to HTTPS which is a significant effort given the amount of 3rd party content they load on their site.
project_objective: |
  As one of our first clients, our team has supported Wisebread’s platform since 2010. The solutions we’ve provided have evolved alongside WB’s business needs. We’re now implementing a sophisticated architecture that maximizes uptime to their high-investment campaign pages.
project_process: |
  After auditing the Wisebread site and hosting architecture, security improvements were made to caching of high traffic and business-critical pages (by modifying their Varnish cache configuration). Monitoring and alerts were set up to quickly respond to issues as we seamlessly updated servers with no downtime by thoroughly planning ahead (with contingencies in case of issues). The server was upgraded by (1) provisioning the new updated server, (2) migrating the site from the old server to the new one, (3) testing and verifying the site via the new server, (4) cutting all traffic from the old server to the new server instantly, and finally (5) spinning down the old server once the process was complete and verified.

  We were able to identify all 3rd party resources loaded by the Wisebread site insecurely (using HTTP) and worked with the Wisebread team to load all these assets securely. Then we installed and configured the certificates on the Wisebread servers to work with the Varnish cache layer and configure the certificates to auto-renew and set up certificate monitoring.
project_results: |
  With millions of visits per month to multiple highly trafficked pages, we’re proud to tout a 99.99% uptime for the wisebread.com platform in 2018.
services_provided: |
  - [Auditing and hosting architecture](/services/development)
  - [Monitoring and alert set up](/services/support)
  - [Updated servers](/services/development)
  - [Site Migration](/services/development)
technologies_used: |
  - [Varnish](/blog/tag/performance)
  - [Linode](/blog/tag/legacy-systems-integration)
client_logo: "/assets/img/work/logos/wisebread-logo.png"
client_logo_width: "430px"
client_logo_height: "85px"
client_logo_light: "/assets/img/work/logos/wisebread-logo-eggshell.png"
tile_description: |
  A longtime partner, we’ve created solutions in stride with Wisebread’s needs. One thing we’re most proud of: the 99.99% uptime for the platform.
image: "/assets/img/work/wisebread/wisebread-showcase.png"

---
