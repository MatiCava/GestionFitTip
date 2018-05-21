import { Component, OnInit } from '@angular/core';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

  constructor(private routineServ: RoutineService, private router: Router) { }

  ngOnInit() {
  }

}
