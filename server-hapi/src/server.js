const Hapi = require('hapi');
const HapiAuthJWT2 = require('hapi-auth-jwt2');

const routes = require('./routes');
const secret = require('./secret');

const validate = async function (decoded, request) {
    request.user = 'me';
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

    server.route(routes);
    //server.route({
    //    method: 'GET',
    //    path: '/',
    //    options: { auth: false },
    //    handler: (request, h) => {
    //        return [];
    //    }
    //});

    await server.start();
    return server;
}

init().then((server) => {
    console.log(`Server started at ${server.info.uri}`);
})
.catch((error) => {
    console.log(`Could not start server: ${error}`);
});