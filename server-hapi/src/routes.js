const JWT = require('jsonwebtoken');
const secret = require('./secret');

module.exports = [
    {
        method: "GET", path: "/",
        options: { auth: false },
        handler: function (request, h) {
            return { text: 'Token not required' };
        }
    },
    {
        method: 'GET', path: '/api/me',
        options: { auth: 'jwt' },
        handler: function (request, h) {
            return { text: 'You used a Token!', user: request.user };
        }
    },
    {
        method: 'GET', path: '/auth/login',
        options: { auth: false },
        handler: function (request, h) {
            let payload = { user: 'Chris', isCool: true, number: 1 };
            let token = JWT.sign(payload, secret);
            return { token: token };
        }
    }
]