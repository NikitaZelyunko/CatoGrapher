import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  Token: any;
  constructor() {
    this.Token = localStorage.getItem('Token');
    console.log(this.Token);
  }

  ngOnInit() {
  }

}
