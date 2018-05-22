# angular-hapi-jwt-template

A sample local login/facebook login using Angular.io, Hapi and JWT.

No database is used; you can hook up your own user lookup in server-hapi/src/auth/auth_local.js. For Facebook logins, add users to your database in server-hapi/src/auth/auth_facebook.js.

Configure your app using .env in the root, copy the existing .env.template to .env and fill in the parameters.

I'm using VS2017 as the code editor/debugger; the solution and project files are included.

For Facebook login to work, you will need to run under HTTPS, the keys are installed in:
localhost/fullchain.pem
localhost/privkey.pem

To set up HTTPS for local development:
- Generate the keys using LetsEncrypt for your site (I use a wildcard)
- Redirect your hosts file to localhost (I use a subdomain for mine, hence the wildcard)

Chris Arquiza