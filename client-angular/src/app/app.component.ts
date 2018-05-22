import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  title = 'app';
  isLoggedIn: boolean = false;
  email: string = '';
  password: string = '';

  displayName: string = '';
  displayImage: string = '';
  loginType: string = '';

  updateCredentials() {
    this.isLoggedIn = this.auth.isAuthenticated();
    let credentials_string = localStorage.getItem('credentials');
    if (credentials_string) {
      let credentials = JSON.parse(credentials_string);
      this.displayName = credentials.name;
      this.displayImage = credentials.image;
      this.loginType = credentials.login;
    }
    else
    {
      this.displayName = '';
      this.displayImage = '';
      this.loginType = '';
    }
  }

  ngOnInit() {
    this.updateCredentials();
  }

  doLogin() {
    //    alert('dologin');
    let payload = { email: this.email, password: this.password };
    this.http.post('auth/login', payload).subscribe((data) => {
        if (data['token'])
        {
          this.auth.setToken(data['token']);
          this.isLoggedIn = true;
          localStorage.setItem('credentials', JSON.stringify(data['credentials']));
          this.updateCredentials();
        }
        else if (data['error'])
        {
          console.log(data['error']);
          alert(`Login error: ${data['error']}`);
        }
        else
        {
          console.log(data);
          alert(data);
        }
      },
      (error) => {
        console.log(error);
        alert(`Error: ${error}`);
      });
  }

  doLogout() {
    this.auth.clearToken();
//    this.isLoggedIn = false;
    window.location.href = '/';
  }

  tryAuthorizedOnly = () => {
    this.http.get('api/me').subscribe((data) => {
        console.log(data);
        alert(`success ${data}`);
      },
      (error) => {
        alert(`error ${error}`);
      });
  }

  doFacebookLogin = () => {
    var url = 'https://www.facebook.com/dialog/oauth?client_id=2037494183239470&redirect_uri=https://local.artof.tech/auth/login_facebook&scope=email,public_profile';
    //    alert(url);
    window.location.href = url;
  }
}
