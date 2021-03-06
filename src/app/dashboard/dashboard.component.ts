import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'http://api.hackafake.com:8080';

interface User {
  username: string,
  fake: number,
  real: number
}

interface Fake {
  title: string,
  url: string,
  is_fake:boolean
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public Math: any = Math;
  public counter: number = 0;
  public users: User[];
  public fakes: Fake[];
  constructor(private http: HttpClient) { }

  getData() {
    this.http.get(URL + '/counter').subscribe(
      data => this.counter = data["fake"]
    )

    this.http.get<User[]>(URL + '/users').subscribe(
      data => this.users = data.filter(user => user.fake > 0).filter((item, index) => index < 5)
    )

    this.http.get<Fake[]>(URL + '/fakenews').subscribe(
      data => this.fakes = data.filter(el => el.is_fake ).filter((item, index) => index < 5)
    )

  }

  ngOnInit() {
    this.getData();
    setInterval( () => this.getData(), 1000);

  }

}
