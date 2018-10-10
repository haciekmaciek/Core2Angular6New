import { Component, Input, OnInit } from "@angular/core"

@Component({
  selector: "user-app",
  template: `
                <div>
                    <nav class='navbar navbar-expand-sm bg-dark navbar-dark'>
                 
                            <ul class='navbar-nav'>
                                <li class="nav-item"><a class="nav-link" [routerLink]="['./home']">Home</a></li>
                                <li class="nav-item"><a class="nav-link" [routerLink]="['./user']">Users Management</a></li>
                                <li class="nav-item"><a class="nav-link" [routerLink]="['./grid2/test1']">Zarządzanie gridem</a></li>
                                <li class="nav-item"><a class="nav-link" [routerLink]="['./grid2/test2']">Zarządzanie 2 gridem</a></li>
                            </ul>
                       
                    </nav>
                    <div class='container'>
                        <router-outlet></router-outlet>
                    </div>
                 </div>          `
})

export class AppComponent implements OnInit {

  ngOnInit() {

  }
}
