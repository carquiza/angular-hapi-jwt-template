# angular-hapi-jwt-template

A sample Angular app that demonstrates Facebook and local logins. The back-end is barebones HapiJS, and authentication is handled via JWT.

No database is used; you can hook up your own user lookup in server-hapi/src/auth/auth_local.js. For Facebook logins, add users to your database in server-hapi/src/auth/auth_facebook.js.

### Configure your app

You will need to create the following configurations files. *.template files have been provided as a guide.

```
    server-hapi/.env -- copy from server-hapi.env.template or set your ENVIRONMENT variables
    client-angular/src/environments/environment.ts -- copy from the provided environment.ts.template file
```

In `server-hapi/src/server.js` are two functions, `validateLocal` and `validateFacebook` where you can hook into your database to verify logins.


### Requirements for Facebook login

For Facebook login to work, you will need to run under HTTPS.

To set up HTTPS for local development:
- Generate the keys using LetsEncrypt for your site (You will need access to an actual domain and a VPS)
- Redirect your domain to localhost using your hosts file
- Copy the files to the following locations
```
    ./localhost/fullchain.pem
    ./localhost/privkey.pem
```
To make things easy for myself, I use a subdomain and generated a key for that just for local development.

### Running the app

On Windows I use two command terminals, one to run `ng serve`, while API calls are proxied to hapi.
The proxy configuration is in `./client-angular/proxy.conf.json`.

**Note: This setup is for development only. In production, you should use nginx or similar to serve the angular files statically while routing API calls to hapi.**

To run the front-end Angular server:
```
    cd client-angular
    npm run start-dev
```
This will run ng serve with additional parameters to load SSL keys from the ./localhost subdirectory.
There will be a scary message about `--disable-host-check`. If you wish to remove the message, replace the --disable-host-check in package.json with `--host mywebsite.com`.

To run the back-end Hapi server:
```
    cd server-hapi
    npm start
```


I'm using VS2017 as the code editor/debugger; the solution and project files are included. You may step through code by running server-hapi/src/server.js in the IDE.

Christopher L. Arquiza
