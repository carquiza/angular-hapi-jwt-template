const secret = require('../secret');
const JWT = require('jsonwebtoken');

module.exports = [
    {
        method: 'POST', path: '/auth/login',
        options: { auth: false },
        handler: function (request, h) {
            let payload = request.payload;

            // TODO: Do authentication hre
            if (payload.email == 'aaa' && payload.password == 'a' )
            {
                let credentials = { userid: 'ABCD', login:'local' };
                let token = JWT.sign(credentials, secret, { expiresIn: '7d' });
                return { token: token, displayName: 'Chris' };
            }
            else
            {
                return { error: 'Incorrect email or password' };
            }
        }
    }
]