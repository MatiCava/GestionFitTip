import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translateService: TranslateService, private routerService: Router) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  alumnos() {
    this.routerService.navigate(["/alumnos"]);
  }
}
