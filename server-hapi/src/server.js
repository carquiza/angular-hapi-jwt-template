require('dotenv').config();

const Hapi = require('hapi');
const HapiAuthJWT2 = require('hapi-auth-jwt2');

const auth_local = require('./auth/auth_local');
const auth_facebook = require('./auth/auth_facebook');

const routes = require('./routes');
const secret = process.env.JWT_SECRET;

const validate = async function (decoded, request) {
    request.userid = decoded.userid;
    return { isValid: true };
}

const init = async () => {
    const server = Hapi.Server({ port: 3030 });
    await server.register(HapiAuthJWT2);
    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        validate: validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');

    server.route(auth_local);
    server.route(auth_facebook);

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