---
layout: post
title: "Speaking Drupal"
date: 2019-04-23
author: Maddy Bishop-Van Horn
tags: drupal
summary: "An introduction to Drupal terminology"
description: "An introduction to Drupal terminology"
image: "/assets/img/blog/speak-drupal-hero.jpg"
featured_image: "/blog/speak-drupal-hero.jpg"
featured_image_alt: "Drupal trademark"

---

Oh, hello there. I’m Savas Lab’s [newest project manager](https://savaslabs.com/company/maddy-bishop-van-horn/). In addition to being new to Savas, I’m also new to Drupal. Before joining Savas, I had experience with several other CMSs (Wordpress, Craft, Joomla!, and Umbraco, in addition to a couple of custom Rails apps.) I didn’t know much about Drupal, but I’d heard enough rumors to be a little afraid.

<div class="blog-image-large">
<img alt="Learning curve for popular CMSs" src="/assets/img/blog/drupal-learning-curve.jpg">
 <span class="caption">Often shared image, source unknown.</span>
</div>

As I’ve learned more about Drupal, I’ve come to appreciate that it is an incredibly powerful and flexible CMS, and that its supported by a great community. My coworkers at Savas have helped me overcome the first hurdle in learning to work with Drupal: understanding Drupal terminology. 

Before we dive in, I’d like to extend a huge thank you to [Anne](https://savaslabs.com/company/anne-tomasevich/) and [Chris](https://savaslabs.com/company/chris-russo/) for their mentorship and their contributions to this article.

Let’s get started.

## Drupal Terminology

I’ll admit it: Drupal terminology is not very intuitive. This article lists the key terms and concepts that I’ve found necessary to get started. I’ll break it into five categories:

1. Drupal code
2. Content
3. Taxonomy
4. Users
5. Views

### 1. DRUPAL CODE
What is Drupal? Drupal is made up of three basic parts:

#### Drupal Core:
The codebase that makes up Drupal. It’s open source and updated consistently by the Drupal community. Drupal 8 is the newest version. The move from Drupal 7 to 8 is an investment, but [it’s worth it](https://savaslabs.com/2017/11/08/cost-of-drupal-7.html) and it should be the last time an upgrade is so involved.

#### Module:
A module is a directory of code that extends Drupal features/functionality. Drupal core comes with some modules, and many others are **contributed** by the Drupal community. You may hear these modules referred to as “contribs”. If needed, developers can create **custom** modules for specific functionality. *(Wordpress translation: Modules are kind of like plugins, although they generally require more development knowledge to install and maintain.)*

#### Theme:
The Theme is the part of the Drupal codebase that determines how the site and its content are displayed. This includes markup, CSS, JavaScript, and Drupal configuration files. Savas Labs nearly always develops custom themes for our clients.


### 2. CONTENT
Content refers to the copy, images, and other media that make up a website.

#### Content type:
A collection of fields created and defined by a developer. Each field has a defined data type, limits, and display specifications. Drupal Core comes with some basic content types, like “article” and “basic page.” Developers can define other content types.

#### Node:
A piece of content created by a content editor. Each node has an associated content type. Nodes can be displayed in a variety of ways across the site (we can think of it as a page, although it can be displayed in other ways too. These other ways are configured by developers by using **views** - more on that below).

#### Paragraph:
Paragraphs are a new and exciting feature of Drupal 8. Paragraph types are defined by developers, and they can have fields that include text, media, buttons, and more. (I repeat: paragraphs are not just for text.) I like to think of Paragraphs as components that can be added to a **node** (which, remember, we can think of as a page).  Developers can add **paragraph** fields to **content types** to allow content editors to add a variety of **paragraph types** to a node. 

#### Blocks:
Blocks are a way to put content in different regions of the site. This can be turned on and off for different pages. Sidebars are a good example of blocks.

### 3. TAXONOMY
Taxonomy is an important and powerful part of Drupal. It’s how Drupal defines relationships between content. 

#### Taxonomy:
Taxonomy is a system for classifying content.

#### Vocabulary:
A vocabulary is basically a taxonomy type. Like content types, Vocabularies are a defined collection of fields and can have visible pages, but often they do not. Vocabularies are meant to be "tags" for content rather than pieces of content themselves. However, developers can define a vocabulary using any collection of fields, so it is technically possible for a Vocabulary to show up as a page, just uncommon.

#### Term:
An item within a vocabulary. You can think of a term as a “tag,” although they can have additional fields, as I mentioned above. **Terms** are to **vocabularies** as **nodes** are to **content types**.

### 4. USERS
Drupal has highly customizable user permissions and roles… But what does that mean?

#### User:
A user is anyone interacting with the site. Users can be **anonymous** (not logged in) or **authenticated** (logged in with an account).

#### Role:
A role is a defined type of user with assigned permissions. **Anonymous** is one role. **Authenticated** users can be given any number of defined roles, for example: “logged-in user,” content creator,” and “administrator.” Administrators can create and customize as many roles as they want.

#### Permissions:
Permissions are granular abilities assigned to each role by site administrators. Each **role** can have different view and edit permissions (e.g. “view published content,” “administer users,” “create new content”.)

### 5. VIEWS
Drupal Views is one of the more powerful features of a Drupal site. It gives site administrators a high level of control and sophistication for grouping and presenting content across the site.

#### Views Module: 
The Views module allows administrators and site designers to create, manage, and display lists of content. Each list managed by the views module is known as a **view**, and the output of a view is known as a **display**. Displays are provided in either block or page form, and a single view may have multiple displays.

#### View Mode:
Using the **Views module**, developers can configure each **content type** to have various **view modes**. This is a way of outputting a **node** in a specific format with a specific set of fields. This specific format is known as a **display**. 

For example, a developer may make a “Preview” view mode, which will display a subset of the fields of a given **content type**. By editing the fields of the node, content editors can change the content displayed in the “Preview” view mode. Another good example of a view mode that a developer may configure is a "search result" view mode, which will define, for each content type, how to display that content on the search page.

## Summary
Good news: we made it! I won’t claim that you’re now completely fluent in Drupal, but you should have the foundation to understand and talk about the building blocks of a Drupal site with a developer or site builder. 

Are you also new to Drupal? Or are you a Drupal pro? Either way, leave a comment below with your favorite resources.


