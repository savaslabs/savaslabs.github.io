---
layout: post
title: "How we added comments to our Jekyll site"
date: 2016-04-20
author: Kosta Harlan
tags: jekyll
summary: |
  A peek under the hood at our website's commenting app, Squabble.
---
[Avid readers of our blog](/2015/04/01/building-our-site.html) know that it's built using the amazing and lovely open-source static site generator known as [Jekyll](http://jekyllrb.com/).

Jekyll is a great solution for a site like ours because we get an always-on[^1], super fast, database-free site that's also capable of many of the things you'd typically associate with a database-driven site: tagging, content organization, advanced templating, etc. Best of all, it's one less application for us to host and keep up-to-date with the latest security patches.

However, as much as we like our static HTML, we also care about you, dear reader, and we wanted to provide an easy way for you to comment on and contribute to discussion on our site's content.

This post provides an overview of how and why we implemented comments for our Jekyll site. If you find it interesting or helpful... leave a comment!

## How most people solve the problem

Most folks using static site generators include comments by outsourcing their site's comment section to [Disqus](https://disqus.com/).

Disqus works like this: you sign up for their service and get a `<script>` embed code that you place in your page template. When the user visits that page, their browser will load the Disqus commenting widget. All comments are stored on Disqus' servers, the script loads any comments stored in Disqus for the particular URL the user is on.

This is an elegant solution, but there are some problems. For one, you don't own your comments; they reside in a third-party service. And as [Our Incredible Journey](http://ourincrediblejourney.tumblr.com/) has well documented, services, even big ones like Disqus, sometimes disappear without much warning.

More importantly, Disqus doesn't have a great track record on privacy. By default, they track your activity while you browse sites across the web:

> We strive to make the Disqus experience as personalized and relevant as possible for all users. In doing so, we collect non-personally identifiable interest information to deliver targeted content and advertising on websites that use Disqus, as well as other websites you may visit.

This is somewhat mitigated by this [semi-hidden setting](https://help.disqus.com/customer/portal/articles/1657951) that lets you opt out of some of their tracking, but I'm willing to venture that the vast majority of Disqus users don't know about this. And the "non-personally identifiable information" term is a [bit of a misnomer](https://www.eff.org/deeplinks/2009/09/what-information-personally-identifiable) in any case.

(Full disclosure: we're not entirely innocent in this respect either, since we're using Google Analytics on our site, so if you are not doing so already, we invite you to go install an ad blocker plugin for your browser and come back to finish the article!)

## Creating an alternative

The privacy concerns and content ownership issues with Disqus were enough to make us look elsewhere for other solutions, and when the alternatives weren't exactly what we were looking for, we decided to roll our own.[^2]

Our requirements were simple: allow users to leave a comment on a post, have that comment show up to other users who visit the post.

The basic plan for implementing our Disqus alternative was similar to the Disqus model: on the Savas Labs website, embed some JavaScript in our page template; that JavaScript is then responsible for (1) loading any comments housed in our comment application, and (2) posting new comments to the comment application. The comment application, in turn, is a PHP application with an API that provides create/read/delete operations to users of our website.

### Built on Lumen

Looking around the open source landscape for the right tool to build this app, we came across [Lumen](https://lumen.laravel.com/), a slimmed down version of the well-known [Laravel](https://www.laravel.com) project. Lumen was very simple to get up and running with thanks to the [clear documentation examples](https://lumen.laravel.com/docs/5.2).

The entry point of our application are some [routing rules](https://github.com/savaslabs/squabble/blob/master/source/app/Http/routes.php) that determine what data to give back to the user when they visit a particular API endpoint.

From there, the requests are processed in the [CommentController](https://github.com/savaslabs/squabble/blob/master/source/app/Http/Controllers/CommentController.php) — depending on the request, we can create a comment, retrieve a comment, delete it, or get a quick list of all posts and the number of comments per page (we use this information on our home page and on the [News](/news) page to show the comment count per article).

The application runs on one of our cloud servers on Linode, and uses a SQLite backend. Because the Lumen framework is very lean, and the application does relatively little, it's very fast — the `api/comments/count` call takes ~84 ms while loading all comments (`api/comments`) takes about 125 ms.

### Tying it all together

Now that we set up our backend application for managing comments, we needed a way to interact with it. On this site, we have some JavaScript to interact with the API. You can look at our Jekyll site's [`main.js`](https://github.com/savaslabs/savaslabs.github.io/blob/master/assets/js/main.js) for the gory details, but basically we make use of the jQuery `ajax()` method to `GET` and `POST` data from and to our commenting API.

## Conclusion

And now you know how and why the "Comments" section on this post appears as it does!

In conclusion, I should mention that the major downside of building your own comment hosting application is that you have to ... build your own comment hosting application. In other words, nothing comes for free — you have to build every feature yourself.

That's why, for example, we don't (yet) have nicely formatted comments (they are plain text only), and users don't get notifications when someone replies to their comment, there's no comment threading, etc. On the other hand, what we have met our team's expectations for minimum viable/lovable product, and it was a good learning experience for our team to develop this application over the last year.

Our [website](https://github.com/savaslabs/savaslabs.github.io) and [comment application](https://github.com/savaslabs/squabble) code is all open source, so have a look and feel free to use it for your own projects.

[^1]: [Nearly](https://twitter.com/githubstatus/status/711965206029725697).
[^2]: I should mention we investigated some alternatives too; writing code from scratch that we have to then maintain is rarely our first choice. The [Isso](https://posativ.org/isso/) project is very cool but seemed a little complex to deploy and maintain. And [this person](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html) came up with a solution that cleverly uses GitHub Issues for gathering comments, but then we'd shut the door on anyone without a GitHub account, and having to visit GitHub to leave a comment is more than a little awkward. Another benefit to writing our own implementation: a great opportunity for the team to stay current with the latest technology and make use of a popular PHP framework.
