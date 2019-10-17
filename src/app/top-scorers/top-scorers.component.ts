import { Component, OnInit } from '@angular/core';
import {TopScorersService, LeagueScorer } from './top-scorers.service';
@Component({
  selector: 'app-top-scorers',
  templateUrl: './top-scorers.component.html',
  styleUrls: ['./top-scorers.component.css']
})
export class TopScorersComponent implements OnInit {
  leagueId: number;
  topScorers: LeagueScorer [];

  constructor(private topScorersService: TopScorersService) { }

  ngOnInit() {
    this.leagueId = this.topScorersService.getLeagueId();
    this.topScorers = this.topScorersService.fetchTopScorers(this.leagueId);
  }

}
