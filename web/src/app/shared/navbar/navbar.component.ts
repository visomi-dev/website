import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UiService } from '../ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(
    public router: Router,
    public ui: UiService,
  ) {}

}
