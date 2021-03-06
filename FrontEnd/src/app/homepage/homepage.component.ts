import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { UserModel } from '../user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user= this.userAuthService.get_user();

  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit() {
    const menu = window.document.getElementById('menu');
    menu.style.display = 'block';
    const header = window.document.getElementById('header');
    header.style.display = 'block';

    
    const content = window.document.getElementById('content');
    content.style.width = '80%';
    content.style.height = '90%';
    content.style.background = '#d2d0d2';
    
        const container = window.document.getElementById('container');
        container.style.width = '80%';
        container.style.height = '100%';
        container.style.left = '10%';
  }

}
