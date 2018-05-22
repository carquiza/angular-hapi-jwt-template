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
            return { text: 'You used a Token!', userid: request.userid };
        }
    }
]