const JWT_SECRET = process.env.JWT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const JWT = require('jsonwebtoken');
const axios = require('axios');

const redirect_uri = 'https://local.artof.tech/auth/login_facebook';


var doFBLogin = async (code) => {
    var url = `https://graph.facebook.com/v3.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`;
    console.log(url);
    var fb_response = await axios.get(url);
    if (fb_response.status == 200) {
        var { access_token, token_type, expires_in } = fb_response.data;
        var debug_token_response = await axios.get(`https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${access_token}`);
        if (debug_token_response.status == 200) {
            var { app_id, type, application, expires_at, is_valid, issued_at, scopes, user_id } = debug_token_response.data.data;
            if (is_valid) {
                var expiry = new Date(expires_at * 1000);

                var fields = 'name';
                if (scopes.indexOf("email") > -1) {
                    fields = fields + ",email";
                }

                var data_response = await axios.get(`https://graph.facebook.com/me?fields=${fields}&access_token=${access_token}`);

                var { name, email } = data_response.data;

                var fb_data = {
                    'logged_in': true,
                    'user_id': user_id,
                    'expires_at_date': expiry,
                    'scopes': scopes,
                    'name': name,
                    'email': email,
                    'access_token': access_token
                };
                return fb_data;
            }
            else {
                return { 'logged_in': false, 'reason': 'invalid_access_token' };
            }
        }
        else {
            return { 'logged_in': false, 'reason': 'access_token_inspection_failed' };
        }
    }
    else {
        return { 'logged_in': false, 'reason': 'access_token_failed' };
    }
}

module.exports = [
    {
        method: 'GET', path: '/auth/login_facebook',
        options: { auth: false },
        handler: async (request, h) => {
            var code = request.query.code;
            var res = await doFBLogin(code);
            if (res.logged_in)
            {
                // TODO: Create a new user using the given facebook id (res.user_id)
                let email = res.email;
                let facebook_id = res.user_id;
                let credentials = { userid: 'ABCD_FB', login: 'facebook', facebook_id: res.user_id, displayName: res.name, displayImage: `http://graph.facebook.com/${facebook_id}/picture?type=square` };
                let token = JWT.sign(credentials, JWT_SECRET, { expiresIn: '7d' });
                //return { token: token, displayName: res.name, facebook_id: res.user_id };
                return `<html><script>localStorage.setItem('token','${token}');localStorage.setItem('credentials','${JSON.stringify(credentials)}');window.location.href='/';</script><body><body></html>`;
            }
            else
            {
                return { error: res.reason };
            }
            return res.logged_in;
        }
    }
]