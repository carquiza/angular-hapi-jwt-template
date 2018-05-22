const JWT_SECRET = process.env.JWT_SECRET;
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
                let credentials = {
                    name: 'Chris',
                    image: '',
                    userid: 'USER_GUID_LOCAL',
                    login: 'local'
                };
                let token = JWT.sign(credentials, JWT_SECRET, { expiresIn: '7d' });
                return { token: token, credentials: credentials };
            }
            else
            {
                return { error: 'Incorrect email or password' };
            }
        }
    }
]