---
layout: post
title: "Usability Testing - Our Process and Favorite Practices"
date: 2016-06-22
author: Anne Tomasevich
tags: user-experience best-practices
summary: Our approach to designing, conducting, and learning from user testing and other analyses.
featured_image: "/assets/img/blog/usability-testing.png"
featured_image_alt: "Two people comparing notes while using computers"
---

One of my favorite lines about usability testing comes from Jakob Nielson of the Nielson Norman Group in his article [Why You Only Need to Test with 5 Users](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/), regarding a graph of number of user test participants versus percentage of usability problems found:

> The most striking truth of the curve is that zero users give zero insights.

This, along with [other persuasive evidence](https://articles.uie.com/three_hund_million_button/), is a fantastic reminder that we can learn so much about what's right and what's wrong with our websites simply by watching people use them.

At Savas Labs we've honed our approach to usability testing to balance efficiency, budget, and effectiveness. I'd like to share our process, some of my favorite resources, and some lessons we've learned along the way.

## Our Process

Our process comprises six phases:

1. [Determine goals and user personas](#determine-goals-and-user-personas)
2. [Review Google Analytics](#google-analytics)
3. [Complete competitive analysis](#competitive-analysis)
4. [Conduct user testing](#user-testing)
5. [Conduct user survey](#user-survey)
6. [Compile findings](#compile-findings)

### Determine goals and user personas

Focusing a usability study on a product's most critical users and functionality can help uncover the highest-impact problems without spending time and budget on lower-priority issues. To start the process, we meet with our clients and listen to them explain their purpose, describe their users, and identify potential or known issues with their website.

From here, we create two very important lists:

1. The client's goals for the usability study
2. The client's users, in order of priority

Let's break these down.

**Goals:** These can be measurable metrics (e.g. "Increase newsletter signups" or "Increase time spent on site") or general value statements ("Provide a great experience on small screen sizes" or "Maintain a clean, modern design").

**Users:** This is a list of user personas in order of priority for the particular project. A persona is more in-depth and specific than a demographic, which may represent an age group, a gender, or an occupation. A persona is defined by patterns of behavior and needs, so it may encompass multiple demographics, and one demographic may be split across several personas. The user list is prioritized using the goals of the project (unless the client is lucky enough to be able to put forward the time and money to fix all of their users' problems at once!) One of our roles in this process is helping the client brainstorm and account for all of their user groups, including ones they might not have considered.

Once these lists are created, we review them at the beginning of every meeting (yes, every meeting!). Why? Ensuring that the entire team is completely focused on meeting the project goals at all times causes a few awesome things happen:

1. Perhaps most importantly, at the end of the project everyone will be satisfied with the results, since they're founded upon pre-determined goals that were agreed upon by everyone involved.
2. Disagreements or uncertainty can be weighed against the goals -- asking if something helps meet or doesn't help meet the goals starts a focused, productive conversation.
3. Team members are less likely to bring up or spend time on issues that don't actually improve the end product.

I should note that using user personas over demographics and repeating goals at each meeting are tips I picked up from Adam Connor's workshop ([and associated book](http://shop.oreilly.com/product/0636920033561.do)) Discussing Design. I'd highly recommend both! These practices are  an abbreviated version of what he calls a ["mini-brief"](http://www.slideshare.net/adamconnor/discussing-design-the-art-of-critique/17-The_MiniBriefA_MiniCreative_Brief_is), a one-page document detailing project goals, users, and more that is reviewed at each meeting.

So how does this apply to usability testing? Nailing down project goals and the most critical user groups will focus the scope of usability testing and increase the impact of the findings. We can review analytics and competitors' sites with the client's goals in mind, target the most critical users with user testing, cover a broader user base with user survey, and compile opportunities for improvement relevant to the client's goals and real users of the product.

Once the goals and users are compiled and agreed upon, we can start digging into the usability testing.

### Google Analytics

Reviewing Google Analytics is a great first step towards focusing user testing on the aspects of the site that are causing the most issues. If a client doesn't already have Google Analytics installed, we can help set this up.

Viewing the analytics interface for the first time can be a bit overwhelming, so I'll review some terminology and some of the points on which I like to focus for the purposes of usability testing.

##### Terminology

- **Bounce rate:** The percentage of users who leave the site after viewing a single page
- **Exit page:** The last page a user views before leaving the site
- **Organic search:** search results not provided by paid advertisements
- **Engagement:** A combination of bounce rate, session duration, and pages viewed per session

##### Useful information

- Where are the users located?
  - Audience <i class="fa fa-long-arrow-right"></i> Geo <i class="fa fa-long-arrow-right"></i> Location
- What's the ratio of new vs. returning users?
  - Audience <i class="fa fa-long-arrow-right"></i> Behavior <i class="fa fa-long-arrow-right"></i> New vs. Returning
- How engaged are users?
  - Audience <i class="fa fa-long-arrow-right"></i> Behavior <i class="fa fa-long-arrow-right"></i> Engagement
- How many users access the site on desktop, tablet, and mobile?
  - Audience <i class="fa fa-long-arrow-right"></i> Mobile <i class="fa fa-long-arrow-right"></i> Overview
- How do users get to the site?
  - Acquisition <i class="fa fa-long-arrow-right"></i> All Traffic <i class="fa fa-long-arrow-right"></i> Channels
- Which pages are most viewed?
  - Behavior <i class="fa fa-long-arrow-right"></i> Site Content <i class="fa fa-long-arrow-right"></i> All Pages
- What are the top exit pages, and which of them are highly viewed pages?
  - Behavior <i class="fa fa-long-arrow-right"></i> Site Content <i class="fa fa-long-arrow-right"></i> Exit Pages

Reviewing these item with our goals and users in mind informs the design of the user testing to follow. We can focus on the parts of the site causing the most users to leave and the behaviors we want to change, and we can test on the devices important to the users.

### Competitive analysis

In tandem with reviewing analytics, we examine our client's competitors' websites (typically with a list of competitors/peers provided by the client). By reviewing the navigation, layout, functionality, and user experience of websites with goals similar to our client's, we can ascertain critical feedback:

- What are other sites doing well? What improvements could be applied to our client's site?
- Where are other sites falling short? How can we ensure these bases are covered on our client's site?
- What user experience problems exist on other sites? Can we test for these same issues on our client's site during the user testing phase?
- How does our client's site compare overall in terms of quality? How can we elevate our client's site among its peers?

### User testing

After gathering information from analytics and competitive analysis, we design our user tests. These are in-person meetings with a single participant at a time who is asked to complete tasks on the website, acting as one of the user personas. After reading the persona description and the task to the user, we observe their experience and record how they interact with the site.

##### Designing the tests

Designing the user tests is a multi-step process:

1. Decide which personas will be tested and how many participants are needed. User personas to be tested are chosen based on the client's priority and potential/known issues found in the review of analytics and competitors. Number of participants can be surprisingly small and still quite effective, as per the Nielson Group's [detailed analysis](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/). Ideally user testing would be iterative -- a few users would be tested, followed by improvements to the site targeting the results of those tests, followed by more testing, etc. If this isn't possible, five participants with one round of testing is typically effective. A/B testing can be implemented to test different versions of the site (or features within the site) within the same round of testing.
2. Determine what needs to be tested. These items come from the critical tasks for our user persona(s), the potential points of frustration or difficulty for users (found by Google Analytics, competitive analysis, or simply review of the current site), and anything else desired by the client. I frame these items as goals.
3. Translate goals to tasks. At this stage, each goal is translated into an actionable task or endpoint for the user.
4. Translate tasks to scenarios. Rarely is a user told exactly what to do on a website in real life. To make the tests more realistic, we translate tasks into scenarios. We'll read the scenario to each user to see if she can complete the desired task, how she approaches the task, and what points of frustration she encounters along the way.

For example:

**Goal:** The newsletter signup should be well-placed and easy to use.

**Task:** Sign up for the newsletter.

**Scenario:** You want to keep up to date with news and job opportunities at XYZ Company. Using the website, find a way to receive monthly email updates from XYZ Company.

[This article](https://www.nngroup.com/articles/task-scenarios-usability-testing/) provides detailed recommendations for creating effective scenarios.

Some other tips for designing user tests:

- We aim for the test to take about 45 minutes, then ask some general or follow-up questions afterwards. Each participant will be there for about an hour.
- Scenarios shouldn't give away how the website is supposed to work.
- Whenever possible, recruit participants who have never seen the site.
- Before conducting any real tests, do a pilot study on a willing participant (a coworker with a free hour works!) This will uncover any phrasing that doesn't work and allow you to check the timing of the test, and it may even start revealing UX issues with the site.
- Offering compensation for a participant's time is not only good practice, it helps immensely with recruitment!

##### Conducting the tests

Once participants are recruited, we bring them in one at a time and include as many observers/note takers as possible to capture the user's actions, reactions, emotions, and words during the test scenarios. We ask the user to think out loud so we can understand their thought process and expectations. We'll first read them the user persona they're portraying, followed by each scenario they'll need to act out. If relevant (and it almost always is), we'll have participants complete some scenarios on their mobile phone or a tablet.

Some lessons we've learned along the way:

- Most people need to be reminded a few times to voice their thoughts aloud.
- One person should read the scenarios and talk to the participant, others should take notes and time each task.
- It helps to remind the participant that they are not being tested, rather, the site is being reviewed. There is no right or wrong action, and everyone is there to see how users actually use the website in its current state.
- The word "test" might make participants nervous. "Scenario" is a more neutral term.
- Some users will ask what they're supposed to do or if a certain choice is right. They can be encouraged to try something new and even allowed to give up, but they shouldn't be fed the "correct" path.

### User survey

To reach more than just the most critical users who were covered by the user testing phase, we create survey questions to elicit feedback from a broad range of users. These questions can be delivered in a variety of ways:

- An email survey sent to all registered users
- A contact form on the website soliciting feedback
- Targeted survey questions provided by a service like [Qualaroo](https://qualaroo.com/), which can be triggered by certain behaviors (e.g. spending time on a specific page or coming to the site via a certain search term)

Cost and potential effectiveness with the targeted user groups must be weighed here.

For traditional surveys, we recommend pairing a [Likert scale](https://www.surveymonkey.com/mp/likert-scale/) with an open-ended response so users can explain their numeric ratings. This creates both quantitative data and expository feedback.

### Compile findings

Our actual deliverable to clients takes the form of a report detailing the findings from each phase of the study and a summary of recommendations for future work. In addition to proposing solutions to issues found during the study, we make recommendations based on best practices and measurable metrics like Google's [Mobile-Friendly test](https://www.google.com/webmasters/tools/mobile-friendly/) and the Web Accessibility Evaluation Tool [(WAVE)](http://wave.webaim.org/). In the end, the client will have a list of tasks we believe will improve their website and -- let's not forget! -- meet their goals.

## Further reading

- [Usability 101](https://www.nngroup.com/articles/usability-101-introduction-to-usability/)
- [Usability Testing Demystified](http://alistapart.com/article/usability-testing-demystified)
