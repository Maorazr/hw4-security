## Submission:

1. Submission is in pairs, but it's better for practice if you start alone.
2. Grades: code part: 70%, questions: 30%.
3. Your submitted git repo should be _private_, please make barashd@post.bgu.ac.il a collaborator.
4. Deadline: end of exams period.
5. Additionally, solve the questions in [tbd].
6. To submit, fill in repository details in the following Moodle [link](https://moodle.bgu.ac.il/moodle/mod/questionnaire/view.php?id=2480698).
7. in Atlas: Set the allowed IP addresses to 'all' (0.0.0.0).
8. Download the final submitted version to a new dir and make sure it installs and runs correctly, preferably on a fresh machine.
9. Start from your previous, hw3-profiles, submission.
10. Make sure you fill and submit "CSRF_readme.txt".

## Goals

1. Add security layers.
2. Hosting: Move the dev projects to a public host.
3. Testing: End to end testing.
4. Optionally polishing the website using tailwind.
   Some of the material will be given in the TA session.

## Implementation - CSRF protection

For this exercise, we implement an attack/defense combo for CSRF.

If you were using cookies in hw3:

1. Follow through the Logrocket website above, and make a version of the code that enables a CSRF attack. commit the code with the message "vulnerable site". If you used local storage for user authentication.
2. Implement the attack, make sure it works, and document the details in a "CSRF_readme.txt" file of how to run the malicious script.
3. then implement the protection. make sure the attack now fails.

If you were using local storage in hw3:

-Implementing an attack here is more challenging. I suggest changing the authentication method to cookies. But, if you like to avoid moving to cookies, and implmenet an attack/protection combo, that will be acceptable.

### Related reading:

1. [HTML5, Local Storage, and XSS (from 2010!)](http://michael-coates.blogspot.com/2010/07/html5-local-storage-and-xss.html)
2. [How to protect a Next.js app from CSRF attacks](https://blog.logrocket.com/protecting-next-js-apps-CSRF-attacks/).
3. [XSS, react sanitization, HTTP only cookies](https://fullstackopen.com/en/part5/login_in_frontend#a-note-on-using-local-storage)
4. [Optional read about cross-site scripting via file upload](https://www.invicti.com/web-vulnerability-scanner/vulnerabilities/cross-site-scripting-via-file-upload/)

## Implementation - Hosting on Vercel, moving to HTTPS

Hosting on Vercel should be straightforward by following the guide above. notice that HTTPS protocol, including its requirements, is provided by the platform. Use the free hobby plan.

### Related reading:

[Deploy next.js to Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app)

## Implementation - testing

Use the Cypress guide to write 5 tests. They can be End to End (E2E) or component tests. The test-driven design tips are included with [hw3](https://github.com/bgu-frontend/hw3-profiles/blob/main/README.md).

### Related reading:

1. [Testing end-to-end (e2e) using Cypress](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#cypress)
2. [e2e and component tests](https://docs.cypress.io/guides/core-concepts/testing-types)

### Bonus, 15 points: polish your website for production with tailwind:

1. [installation](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
2. skim read through [core tailwind concepts](https://tailwindcss.com/docs/utility-first)
3. Suggestion: start by finding a Facebook-like clone example online.
   1. An inspriring [youtube tutorial](https://youtu.be/ytkG7RT6SvU?t=15312) of building twitter clone including tailwind, with github links to the full project below.

### Grading process:

1. Clone your submitted repo.
2. Manually check:
   1. Security mechanisms.
   2. Tests.
   3. Onliny hosting.
   4. security bonus part, if exists: I'll git-check-out the code version to before and after security was implemented, and check that the attack script is successful/failing in the matching cases.

### Getting started-

See the previous homework instructions.

## Good luck!
