---
layout: post
title: "Gender Inclusivity Is More Than an “Other” Option"
date: 2020-01-02
author: Alex Manzo
tags: accessibility best-practices user-experience diversity-inclusion
summary: Conversations around gender inclusivity often focus on gender fields in forms. The conversation is bigger than that, though. Is gender data even necessary? How does a user change their name? How does this all tie into user experience?
description: Conversations around gender inclusivity often focus on gender fields in forms. The conversation is bigger than that, though. Is gender data even necessary? How does a user change their name? How does this all tie into user experience?
image:  "/assets/img/blog/gender-on-forms.png"
featured_image:  "/blog/gender-on-forms.png"
featured_image_alt: "Gender form field with the options 'Male', 'Female', 'Other', and 'Why are you asking?', with the last radio button selected."

---

Recently in our #accessibility Slack channel, [Drew](https://savaslabs.com/company/drew-glover/) shared a [great article on databases accommodating non-binary people](https://slate.com/technology/2019/10/gender-binary-nonbinary-code-databases-values.html). Meredith Broussard gives a great overview on some of the technical nuances of how personal information is stored in databases and the inherent bias that becomes embedded in the code.

As a non-binary person myself (who also happens to work as a developer), this article piqued my interest. Alex the non-binary person believes all “gender” fields should be text fields, with the user free to enter what they please. Alex the developer immediately thinks of all the challenges that solution presents.

However, the conversation about how to handle a “gender” field on forms is a small part of a much larger, more complicated picture. What does inclusivity of gender minorities _truly_ look like? Let’s take a look at some of the bigger issues surrounding that frustrating little form field.

**Gender Data Isn't Necessary**

I believe the fundamental flaws in gender fields is that they just aren’t necessary. Why are you asking a user for their gender? Are you really trying to ask for biological sex? If so, consider labeling the field with “Sex” instead, and provide some short help text of why you’re asking.

It’s worth evaluating if you are using data from a gender field in any meaningful way. Do analytics around gender or sex truly inform decisions your company is making? Some targeted advertising allows using gender as a demographic, but it’s [worth evaluating if that is actually best practice.](https://us.kantar.com/business/brands/2019/when-will-marketers-get-gender-targeting-right/)

Consider an example. Last year, I created an account on an app that would link a reward card to my phone. In the sign up process, I was asked for my gender. The options were Male/Female. It was a required field. I had no way to opt out of it. The rewards card was for a gas station. From my perspective, there was no valid reason they needed this data from me. I chose one at random in exasperation.

It was another day, another online form causing an existential crisis. Sexual and gender minorities already are more likely to be [battling mental health concerns](https://adaa.org/sexual-gender-minority-individuals) than many cisgender folx. Don’t underestimate the impact little moments like this can have on a person.

Imagine if someone in any phase of development stopped to evaluate the purpose of that field and consider the harm it could do. It’s a perfect example of the inherent bias we add to our code unintentionally.

**Let Users Edit Their Personal Information**

I didn’t always know I was non-binary. I was in my late 20s - I’d already created numerous accounts with my “gender” and name embedded in my profile. It should have been easy for me to go back and just quickly edit my various profiles to reflect my new name and gender, right?

Nope! A surprising number of services lock a name field in particular from being edited after the fact. Does your product or service _legitimately_ require a legal name? If not, there’s no reason that shouldn’t be an editable field.

The ability to edit basic profile information is a simple, easy way to be inclusive and provide a better overall user experience.

**But Wait! What About Legal Name Changes?**

Banks, medical patient portals, and other services need your legal name. In this case, it’s fair to create some layer of approval. However, is the process for updating that field easy for a user to find?

In a lot of cases, the answer is no. To make matters worse, many companies lack even a basic _process_ for changing legal names. While changing a surname after marriage is usually accounted for, changing your first or middle name can be surprisingly difficult. Raise your hand if you have completely stumped poor customer service agents trying to do their job 🙋‍♂️.

Here are some examples of companies processing my legal name change:
- One credit card company had no process. The customer service agent simply did not have the ability to edit my first name. I had to send a letter via snail mail explicitly stating what I needed.
- A utility company required me to get a form notarized verifying that my certified court order was in fact, a certified court order.
- My cellular provider informed me it’s impossible to change the name on my account. I have to create a new account, then transfer ownership of my old account to the new one.

**Inclusive Development Helps All Users**

Accessible design and development can be hard. Many developers might feel like they’re catering to a small percentage of people. Recently our team had a skillshare session where [Sean](https://savaslabs.com/company/sean-oshea/), our Senior UX Designer, discussed best practices in accessibility.

In his presentation, he shared examples of how solutions designed for accessibility can benefit everyone. Elevators are an easy example. I am physically capable of walking up the stairs to our third-floor office every day, but often opt for the elevator as an easier solution.

In web development and design, making sites keyboard accessible is often a major focus. Keyboard accessibility is vitally important for users with mobility or vision impairments, but that doesn’t mean they’re the only ones who use it.

Personally, I’m a big fan of keyboard shortcuts and navigation. It ultimately saves me time and makes my every day a little easier. A tool intended for accessibility becomes just as useful for me, even though I don’t necessarily need it.

The ability to edit personal information is something that benefits all users. What if someone made a typo in the sign-up process? I would hate to forever see my name displayed as Alxe because I couldn’t go back and edit. Additionally, some people may want to edit names for anonymity.

More people change their names legally than just transgender folx. People get married and take the surname of their spouse every day. Everyone I know who has gone through that process had many of the similar gripes as me.

Giving a cisgender person the ablity to opt-out of providing their gender also gives them the ability to opt-out of targeting advertisements they might not want to see. It gives them an opportunity to avoid giving personal information where they don’t want to.


**User Experience is Bigger Than You Think**

User experience extends far beyond a company’s website or app. In the earlier example of my cellular provider, it doesn’t matter how easy it may be for me to create a new account on their website. It doesn’t matter how easy it might be to transfer the ownership.

Those particular interfaces could be beautifully designed and developed, but I’ve already had a terrible user experience. Just to get to that point, I had to chat with a customer service agent because I couldn’t find the information anywhere else on the site. (Spoiler: I had such a hard time creating and linking a new account I just gave up).

For even more perspective, if a user is changing their name on your site or app, it likely means they’re repeating the same process dozens of times with other products and services. You can be an easy stop along the way or a pain point. It’s obvious which to strive for.

Want a better solution? Consider this process:
1. Let the user edit the name field.
2. Prompt them with instructions that they’ll need to provide verification (court order, driver’s license, etc.).
3. Provide a file upload for them to share their documents.
4. When they click submit, send it off to customer service for approval.
5. Let the user know it’s in process, and when it’s complete.

That’s it! You’ve created a user-friendly way of updating legal personal data. There are certainly many concerns and logistics that go into implementing that kind of process. As developers, designers, and product owners… that’s our job. We’re here to solve problems and make the best user experience possible.

**Final Thoughts**

My personal disclaimer on my own experiences is that:
1. I am in good mental health and have ready access to any resources if I run into a particularly triggering experience and
2. I have the time/money/education/privilege to navigate these systems.

Many trans and non-binary folx don’t have those advantages, which is why conversations like these are important to have. Like any other aspect of web accessibility, these features aren’t just nice to have. They’re necessary.

If you’d like a guide for creating inclusive gender inputs, I really enjoyed [League](https://league.com/us/)’s [Principles for Inclusive Gender Inputs](https://medium.com/inside-league/principles-for-inclusive-gender-inputs-how-league-went-beyond-binaries-eb8c7eddd8f8).
