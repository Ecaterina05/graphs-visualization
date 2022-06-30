import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-graphs-visualization',
  templateUrl: './graphs-visualization.component.html',
  styleUrls: ['./graphs-visualization.component.css']
})
export class GraphsVisualizationComponent implements OnInit {

  username!: string;
  selected: string = 'Theory';

  constructor(
    private usersService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.username = this.usersService.getUsername();
  }

  goToTheory() {
    this.selected = 'Theory';
  }

  goToVisualization() {
    this.selected = 'Visualization';
  }

  goToApplications() {
    this.selected = 'Applications';
  }

  signOut() {
    this.usersService.isLoggedIn.next(false);
    this.router.navigate(["/"]);
  }
}
