const JWT_SECRET = process.env.JWT_SECRET;
const JWT = require('jsonwebtoken');

module.exports = (validateLocal) => {
    return [
        {
            method: 'POST', path: '/auth/login',
            options: { auth: false },
            handler: async function (request, h) {
                let payload = request.payload;

                var credentials = await validateLocal(payload.email, payload.password);
                if (!credentials.error)
                {
                    let token = JWT.sign(credentials, JWT_SECRET, { expiresIn: '7d' });
                    return { token: token, credentials: credentials };
                }
                else
                {
                    return { error: credentials.error };
                }
            }
        }
    ]
};