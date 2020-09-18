import { Component } from '@angular/core';

import conctatInfo from '../../assets/json/contact.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  items = conctatInfo;
}
