require('dotenv').config();

const Hapi = require('hapi');
const HapiAuthJWT2 = require('hapi-auth-jwt2');

const auth_local = require('./auth/auth_local');
const auth_facebook = require('./auth/auth_facebook');

const routes = require('./routes');
const secret = process.env.JWT_SECRET;

const validateJWT = async function (decoded, request) {
    request.userid = decoded.userid;
    return { isValid: true };
}

const validateLocal = async function (email, password) {
    // TODO: Validate email and password combination
    if (email == 'aaa' && password == 'a') {
        return {
            userid: '<Made-up-user-GUID>',
            name: 'Chris',
            login: 'local',
            image: ''
        };
    }
    else
    {
        return { error: "Invalid email or password" };
    }
}

const validateFacebook = async function (facebook_user) {
    // TODO: Register user if new and return credentials (this goes in the JWT)
    return {
        userid: '<Made-up-user-GUID-for-facebook>',
        name: facebook_user.name,
        login: 'facebook',                  // Show login type
        image: `http://graph.facebook.com/${facebook_user.user_id}/picture?type=square`,
        facebook_id: facebook_user.user_id  // Add in case we need this to display other data
    };
}

const init = async () => {
    const server = Hapi.Server({ port: 3030 });
    await server.register(HapiAuthJWT2);
    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        validate: validateJWT,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');

    server.route(auth_local(validateLocal));
    server.route(auth_facebook(validateFacebook));

    server.route(routes);

    await server.start();
    return server;
}

init().then((server) => {
    console.log(`Server started at ${server.info.uri}`);
})
.catch((error) => {
    console.log(`Could not start server: ${error}`);
});