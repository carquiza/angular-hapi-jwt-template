import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private auth: AuthService) { }

  title = 'app';

  doLogin = () => {
//    alert('dologin');
    this.http.get('auth/login').subscribe((data) => {
      if (data['token'])
      {
        alert("Logged in")
        this.auth.setToken(data['token']);
      }
      else
      {
        console.log(data);
        alert(data);
      }
    });
  }

  doLogout = () => {
    this.auth.clearToken();
    alert("Logged out")
  }

  tryAuthorizedOnly = () => {
    this.http.get('api/me').subscribe((data) => {
      console.log(data);
      alert(data);
    });
  }
}
