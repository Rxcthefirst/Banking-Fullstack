import { AuthService } from 'src/app/Services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
   
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  onHome() {
    console.log(this.authService.loggedIn());
    this.authService.loggedIn() ? this.router.navigate(["/summary"]) : this.router.navigate(["/"]);
  }

}
