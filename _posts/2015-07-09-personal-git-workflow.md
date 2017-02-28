---
layout: post
title: "Personal git workflow... for collaboration"
date: 2015-07-09
author: Chris Russo
tags: git productivity
summary: A git workflow that optimizes the preservation of (your) integrity, and frequent, distributed backups
---

One huge benefit to using a source code management system (SCMS) like the de-facto industry-standard [git](https://git-scm.com/) is it eases, nay, down-right **facilitates** collaboration. One common attribute of a web developer is perfectionism. At times, this wonderful tool and (oft) wonderful trait can be at odds with one another. For those of us who appreciate beautiful code, we (not me) often fear sharing what isn't a polished thing of beauty.

```php
<?php
diff --git a/compost_customizations.module b/compost_customizations.module
index d4e3daf..fa4c5d0 100644
--- a/compost_customizations.module
+++ b/compost_customizations.module
@@ -728,15 +728,42 @@ function compost_customizations_queue_forgotten_bucket_emails() {
         //$raw_collection[0]->field_reminded_about_forgotten_b->set(1);
         $collection = entity_metadata_wrapper('field_collection_item', $raw_collection[0]);
         $collection->field_reminded_about_forgotten_b->set(1);
-        // @todo: remove after finishing
-        if ($collection_id == 6) {
-          // Set to reminded
-          $collection->save();
-        }
-
-
-        $been = 'reminded?';
+        // Set to reminded
+        // @todo: uncomment to save! $collection->save();
+        $date = $collection->field_forgotten_bucket_date->value();
+        $email_content = theme('forgotten_bucket_email', array('user' => $user, 'date' => $date));
       }
+
     }
   }
+}
```

 There are two main problems with selfish sandbagging of one's code.

1. Making mistakes is one
[very efficient way to learn](http://www.goodreads.com/quotes/tag/learning-from-mistakes),
and when others can see your mistakes during your process, if you are open to
constructive criticism, you learn faster. Failure is a necessary part of
[eventual success](https://www.youtube.com/watch?v=45mMioJ5szc).
2. When you are working with one authoritative repository, which, despite git's
naturally
[distributed nature](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows),
is often the case, you may be working on your own code locally for a week or
more without ever pushing that code to another (backup) repository. What happens
when your computer fails? You lose a week of work. It's 2015 while I'm writing
this, and that is no longer acceptable, nor will make you, your employer, or
your client very happy when
([not if](https://en.wikipedia.org/wiki/Murphy's_law)) it happens.

This solution, as it is technical in nature, will only deal with problem #2,
though both are worthwhile in considering how to improve.

Here is the workflow I recommend a solo developer considering for her own
workflow when collaborating with others in a shared code repository.

## Commit early and often
Everything in git is reversible, so no fear of commitment here! Understanding
how to explicitly push and fetch from different remote repositories is a
prerequesite, so make sure you have your repos clearly labeled as to which is
the backup and which is authoritative so when you are ready to push your
unrefined commits, they end up only where you want them, and not where you don't.

```bash
MacBook-Pro:scss chris$ git remote -v
backup  git@bitbucket.org:savaslabs/tilthy-rich-compost.git (fetch)
backup  git@bitbucket.org:savaslabs/tilthy-rich-compost.git (push)
upstream  git@github.com:chrisarusso/Tilthy-Rich-Compost-Website.git (fetch)
upstream  git@github.com:chrisarusso/Tilthy-Rich-Compost-Website.git (push)
```

## Write verbose messages, format **NOTHING**
Worry about cleanliness **LATER**, we will get to that. Write lots of messages,
comment everything, write todos, write questions, write in your native tongue
:tongue: anything that will help you
understand your thoughts and intentions later. To be clear, yes, commit this:

```php
<?php
+
+/**
+ * Function to queue up text and email reminders from cron runs.
+ */
+function compost_customizations_queue_forgotten_bucket_emails() {
+
+  // Retrieve all members who have been marked as a forgotten
+  // bucket but have not yet been notified
+  $query = new EntityFieldQuery();
+
+  $query->entityCondition('entity_type', 'user')
+    ->fieldCondition('field_active', 'value', 1);
+    //->fieldCondition('field_reminded_about_forgotten_b', 'value', 0);
+
+  $result = $query->execute();
+  $user_uids = array_keys($result['user']);
+  $users = entity_load('user', $user_uids);
+
+  foreach ($users as $user) {
+    if (empty($user->field_forgotten_bucket)) {
+      continue;
+    }
+
+    foreach ($user->field_forgotten_bucket[LANGUAGE_NONE] as $forgotten_bucket) {
+      // Do we wrap collections?
+      $collection_id = $forgotten_bucket['value'];
+      $forgotten_bucket_entity = entity_load('field_collection_item', array($collection_id));
+      $reminded = $forgotten_bucket_entity[$collection_id]->field_reminded_about_forgotten_b[LANGUAGE_NONE][0]['value'];
+      // If they weren't reminded, let's queue them up, and set them to reminded
+      if (!$reminded) {
+        // @todo: Queue email
+        $user_wrapper = entity_metadata_wrapper('user', $user);
+        $raw_collection = $user_wrapper->field_forgotten_bucket->value();
+        //$raw_collection[0]->field_reminded_about_forgotten_b->set(1);
+        $collection = entity_metadata_wrapper('field_collection_item', $raw_collection[0]);
+        $collection->field_reminded_about_forgotten_b->set(1);
+        // @todo: remove after finishing
+        // Test on one user so we can rerun and others will satisfy condition
+         if ($collection_id == 6) {
+          // Set to reminded
+          $collection->save();
+        }
+
+
+        $been = 'reminded?';
+      }
+    }
+  }
 }
```

### Push to a backup repository all the time
[Bitbucket](https://bitbucket.org/), a git (and mercurial) repository host
brought to you by [Atlassian](https://www.atlassian.com/), unlike the popular, and beloved
[github](https://github.com/), allows for
[**unlimited free private repositories**](https://bitbucket.org/plans)
so no one ever has to see lots of bad code you write, and it won't cost you
(not directly at least) a thing! So, regardless of what you've got in your
local repository, commit and push it up to your backup _at least_ daily, and
ideally more frequently than that.

### Test, polish, finish, and push to bitbucket
Once you've got your feature functional, tested, suitable to performance, coding
legibility standards and any other criteria your team requires, you are now
nearly ready to share. Push up your final commit that addresses all the @todos,
 and comments you've made with the sloppy intermediate
commits intact to your backup repository.

```bash
git push backup no-one-sees-but-me-branch
```

## Mark the tree (no, not you fido)

We run `git log` or `git show` to see the output of `HEAD` , i.e. the last
commit we made.

```bash
commit b464b4570ba56ec7db751483149b046d88fe8d9d
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Mon Jul 6 14:14:06 2015 -0400

    Final commit after testing/cleaning; rewrite time!
```

Then run, the `git cat-file` with the `-p` option to get a breakdown of the
commit.

```bash
MacBook-Pro:compost_customizations chris$ git cat-file -p b464b45
tree f2f767cefda3d283f0fb3b68fd4f377e554b7f57
parent a313c886ac6f2f85d97679faae12dc78900d34c9
author Chris Russo <chris.andrews.russo@gmail.com> 1436206446 -0400
committer Chris Russo <chris.andrews.russo@gmail.com> 1436206446 -0400
```

Now we know that the tree hash, which defines all of the files in our repository
 is `f2f767ce`; we'll
reference this later to make sure after we're done rewriting, our files match
exactly.

## Rollback to before you started working on your feature and ignored formatting

```bash
MacBook-Pro: chris$  git log b464b45
commit b464b4570ba56ec7db751483149b046d88fe8d9d
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Mon Jul 6 14:14:06 2015 -0400

    Final commit after testing, clean up time!

commit a313c886ac6f2f85d97679faae12dc78900d34c9
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Sun Jul 5 23:50:14 2015 -0400

    Need to squash all these

commit 91a0f4baeca027c10833a074733a4f9b2fc23cc9
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Sun Jul 5 22:17:00 2015 -0400

    Add Blind Carbon Copy module

commit 7e530058003a629450202cc88cc42d17c8ec493f
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Sun Jul 5 18:22:32 2015 -0400

    Continue WIP toward automated emails for missed buckets

commit 78463a4813dcafa9f9e11e1619c2741df47a14e7
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Fri Jul 3 17:47:01 2015 -0400

    WIP

commit 65be3b62cb7fc48ed858eaecc339c6ac91c2c4e9
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Fri Jul 3 17:02:14 2015 -0400

    Remove paypal cruft

commit 96edd7c2a5b0baccc9fe3233c4482d0254a41386
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Fri Jul 3 16:57:23 2015 -0400

    Add WIP of automated missed bucket emails

commit 2feea47ee3562675f07046a9fdf3af07d667999c
Author: Chris Russo <chris.andrews.russo@gmail.com>
Date:   Fri Jul 3 16:11:51 2015 -0400

    Add field collection module

    This was {% raw %}done{% endraw %} to link a specific forgotten bucket date
    with a flag as to whether or not the user was notified.
    We also want to have "alternate" collection weeks on
    routes which will be facilitated by collections as well
```

It looks like the commit right before `96edd7c2a5b0` is where our clean code
ended, so we want to roll back to that.

```bash
git reset 2feea47ee35 --hard
```

## Add back the _polished_ code to the working tree

Bring back the code that you just finished working on to the working tree,
but don't include any of the commits with it.

```bash
git checkout b464b4570ba56ec7db751483149b046d88fe8d9d .
```

Unstage everything so you may start anew.

```bash
MacBook-Pro:drupalroot chris$ git checkout b464b4570ba56ec7db751483149b046d88fe8d9d .
MacBook-Pro:drupalroot chris$ git status
On branch master
Your branch and 'upstream/master' have diverged,
and have 2 and 4 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

  new file:   sites/all/modules/contrib/bcc/LICENSE.txt
  new file:   sites/all/modules/contrib/bcc/README.TXT
  new file:   sites/all/modules/contrib/bcc/bcc.info
  new file:   sites/all/modules/contrib/bcc/bcc.install
  new file:   sites/all/modules/contrib/bcc/bcc.module
  modified:   sites/all/modules/custom/compost_customizations/compost_customizations.module
  modified:   sites/all/modules/custom/compost_customizations/templates/forgotten-bucket-email.tpl.php

MacBook-Pro:drupalroot chris$ git reset HEAD
Unstaged changes after reset:
M drupalroot/sites/all/modules/custom/compost_customizations/compost_customizations.module
M drupalroot/sites/all/modules/custom/compost_customizations/templates/forgotten-bucket-email.tpl.php
MacBook-Pro:drupalroot chris$ git status
On branch master
Your branch and 'upstream/master' have diverged,
and have 2 and 4 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   sites/all/modules/custom/compost_customizations/compost_customizations.module
  modified:   sites/all/modules/custom/compost_customizations/templates/forgotten-bucket-email.tpl.php

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  sites/all/modules/contrib/bcc/
```

## Make new commits, [put your past behind you](https://www.youtube.com/watch?v=k-MpHDvseU8)!

Now make the wonderful commit messages
[you know you can](http://chris.beams.io/posts/git-commit), and impress
your fellow collaborators!

I prefer to add patches of files at a time that are logically related with
`git add -p`

## Check that everything is _exactly_ the same

Since we've now rewritten history, our commit hashes will not line up. We
previously had `b464b4570` and now we have
`3706ca31`.

However, if we look at the tree object, which defines all the project code,
we can see that they are identical, we get `f2f767ce`
again. So we can be confident we didn't miss
anything in our rewriting.

```bash
MacBook-Pro:drupalroot chris$ git cat-file -p 3706ca31771312646f0caf0356cbc9ee3b2f4533
tree f2f767cefda3d283f0fb3b68fd4f377e554b7f57
parent f79d6b54a3a7ee25cb391f0978abf85314113461
author Chris Russo <chris.andrews.russo@gmail.com> 1436206880 -0400
committer Chris Russo <chris.andrews.russo@gmail.com> 1436207673 -0400

Notify subscribers for missed collections

Add a template file for email copy
Add logic to cron to loop through and mail
users after they've not notified us
but have not left their bucket out

Remove old paypal templates and libraries
that aren't being used
```

## Push to your shared platform

Now you're all set to push up your code for others to see!

```bash
git push upstream branch-made-with-pride
```

Pat yourself on the back, go write some bad code, share it with no one,
fix it up, and share it with everyone. Rinse. Repeat.

### Future inspired posts
* My top 10 useful git commands
