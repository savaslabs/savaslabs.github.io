---
layout: post
title: "How we added comments to our Jekyll site"
date: 2016-03-25
author: Kosta Harlan
tags: jekyll
summary: |
  A peek under the hood at our website's comment app, Squabble.
---
[Avid readers of our blog](/2015/04/01/building-our-site.html) know that it's built on the amazing and lovely open-source static site generator known as [Jekyll](http://jekyllrb.com/).

Jekyll is a great solution for a site like ours because we get an always-on[^1], super fast, database-free site that's also capable of many of the things you'd typically associate with a database-driven site: tagging, content organization, advanced templating, etc. And best of all it's one less database-driven application for us to maintain, keep up to date with the latest security patches, and so on.

However, as much as we like static HTML, we also care about you, dear reader, and we wanted to provide an easy way for you all to comment and contribute to our site's content.

## How can I add comments to a static website?

Most people solve this problem in Jekyll by outsourcing the comment hosting to [Disqus](https://disqus.com/). The way this works is: you embed some JavaScript in our template, and that JavaScript loads an interface to the Disqus commenting platform. Users leave a comment via the Disqus, and on subsequent page loads, Disqus finds any comments that are added for a particular URL and displays them to the end user.

Disqus works very well, but there are significant privacy concerns associated with the service as they track your activity while you browse sites across the web. (This is somewhat mitigated by this [semi-hidden setting](https://help.disqus.com/customer/portal/articles/1657951) that lets you opt out of some of their tracking, but I'm willing to venture that the vast majority of Disqus users don't know about this.) It's also not especially attractive, and the pre-built styling associated with Disqus doesn't mesh with the rest of our site.

## Creating an alternative

So, we decided to write our alternative[^2]. Our requirements are simple: we're not going to track you across the web and try to sell you things you don't need. We're not going to offload your data to shady third parties. We just you to be able to leave a comment on a blog post!

The basic plan for implementing our Disqus alternative is similar to what Disqus does: we need to write a PHP application with an API, and that API should allow us to create, delete, and access comments — either all comments or just the comments for a particular blog post.

### Built on Lumen

Looking around the open source landscape for the right tool to build this app, I came across [Lumen](https://lumen.laravel.com/), a slimmed down version of the well-known [Laravel](https://www.laravel.com) project. Lumen was very simple to get up and running with thanks to the [clear documentation examples](https://lumen.laravel.com/docs/5.2).

The entry point of our application are some [routing rules](https://github.com/savaslabs/squabble/blob/master/app/Http/routes.php) that determine what data to give back to the user when they visit a particular API endpoint.

From there, the requests are processed in the [CommentController](https://github.com/savaslabs/squabble/blob/master/app/Http/Controllers/CommentController.php) — depending on the request, we can create a comment, retrieve a comment, delete it, or get a quick list of all posts and the number of comments per page (we use this information on our home page and on the [News](/news) page to show the comment count per article).

The application runs on one of our cloud servers on Linode, and uses a SQLite backend. Because the Lumen framework is very lean, and the application does relatively little, it's very fast — the `api/comments/count` call takes ~84 ms while loading all comments (`api/comments`) takes about 125 ms.

### Tying it all together

Now that we've set up our backend application for managing comments, we need a way to interact with it. On this site, we wrote some JavaScript to interact with the API. You can look at our Jekyll site's [`main.js`](https://github.com/savaslabs/savaslabs.github.io/blob/master/assets/js/main.js) for the gory details, but basically we make use of the jQuery `ajax()` method to `GET` and `POST` data from and to our commenting API.

## Conclusion

And now you know how and why the "Comments" section on this post appears as it does. In conclusion, I should mention that the major downside of building your own comment hosting application is that you have to build your own comment hosting application. In other words, nothing comes for free — you have to build every feature. That's why, for example, we don't (yet) have nicely formatted comments (they are plain text only), and users don't get notifications when someone replies to their comment, there's no comment threading, etc. On the other hand, we don't really need those features at the moment, and it's been a good learning experience for our team to develop this application over the last year. Our [website](https://github.com/savaslabs/savaslabs.github.io) and [comment application](https://github.com/savaslabs/squabble) code is all open source, so have a look and feel free to use it for your own projects.

If you've made it all the way to the end of this post, then go on, and leave a comment!

[^1]: [Nearly](https://twitter.com/githubstatus/status/711965206029725697).
[^2]: I should mention we investigated some alternatives too; writing code from scratch that we have to then maintain is rarely our first choice. The [Isso](https://posativ.org/isso/) project is very cool but seemed a little complex to deploy and maintain. And [this person](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html) came up with a solution that cleverly uses GitHub Issues for gathering comments, but then we'd shut the door on anyone without a GitHub account, and having to visit GitHub to leave a comment is more than a little awkward.
