How I Simplified Our Email System by Moving Templates to React

I recently refactored how we build and send transactional emails in one of my projects, and the result surprised me by how much friction it removed across the team.

This post is about why backend-owned HTML emails did not scale for us, and how moving to React Email with generated types fixed it.

The Original Problem

Our email templates were written directly in the backend using raw HTML and CSS.

That created a few issues:
•	Frontend engineers had to clone the backend repo just to update email UI
•	Backend engineers were forced to write and maintain HTML and CSS, which is neither safe nor enjoyable
•	Changes required tight coordination and context switching
•	Velocity slowed as the system grew

We considered using our email provider’s template engine (SendPulse) and generating templates there, then passing template IDs to the backend.

That introduced new problems:
•	A wrong template ID breaks email sending entirely
•	Debugging failures became harder
•	Writing and maintaining templates inside the provider UI was time consuming
•	The system felt fragile and stressful

None of this scaled well as the team and product evolved.

The New Approach

Instead of fighting the problem, I stepped back and asked a simple question:

Why are emails not treated like UI?

So I changed the model entirely.

We now build emails using React Email, just like frontend components.

Here is the high-level setup:
•	Emails live in their own repository
•	Each email is a React Email component
•	Variables are strongly typed
•	HTML and text versions are generated on demand
•	Backend never touches UI or markup

To make this smooth, I added a few things:
•	A Plop generator to scaffold new email templates instantly
•	A script that auto-generates TypeScript types for each template
•	A CI flow that builds and publishes the templates as a private package
•	A small serverless function that renders HTML and text on request

Deployment stays fast (under a minute) using caching, and updates are safe and predictable.

The “Oh Wow” Moment

The biggest win was the separation of concerns.
•	Frontend owns email UI, content, and expected props
•	Backend only knows what data to send, enforced by types
•	No one needs to understand the other side’s codebase
•	No more guessing template variables
•	No more broken emails due to mismatched IDs or missing fields

The backend installs the email package and updates it only when needed. If the types compile, the email will send correctly.

That shift alone removed an entire class of bugs and team friction.

Why This Scales Better

This approach is:
•	Safer, because types enforce correctness
•	Faster, because templates are generated and shared automatically
•	Cheaper, because we are not locked into provider-specific template tooling
•	More enjoyable, because everyone works in their area of strength

Most importantly, it scales with team velocity.

What Past Me Should Have Known

Backend-owned HTML emails do not scale with growing teams.

Emails are UI. Treat them like UI, version them like code, type them like APIs, and suddenly the whole system becomes calmer.

If you are feeling friction around email templates today, it is probably not a tooling issue. It is an ownership and architecture issue.

⸻

If you want, next we can:
•	Shorten this into a dev.to or Medium post
•	Turn it into a Twitter or LinkedIn thread
•	Add a small architecture diagram explanation
•	Make it more opinionated and spicy

Just tell me where you want to publish it.