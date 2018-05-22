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
  email: string = '';
  password: string = '';

  displayName: string = '';

  doLogin = () => {
    //    alert('dologin');
    let payload = { email: this.email, password: this.password };
    this.http.post('auth/login', payload).subscribe((data) => {
        if (data['token'])
        {
          this.auth.setToken(data['token']);
          this.auth.setDisplayName(data['displayName']);
          this.displayName = data['displayName'];
          alert('Logged in');
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

  doLogout = () => {
    this.auth.clearToken();
    alert("Logged out")
  }

  tryAuthorizedOnly = () => {
    this.http.get('api/me').subscribe((data) => {
        console.log(data);
        alert(data);
      },
      (error) => {
        alert(`error ${error}`);
      });
  }
}
