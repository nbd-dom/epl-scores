import { Component, OnInit } from '@angular/core';
import {UpcomingMatchesService} from './upcoming-matches.service';
import {UpcomingMatches} from './upcoming-matches';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit {

  leagueId: number;
  scheduledMatches: UpcomingMatches[];

  constructor(private upcomingMatchesService: UpcomingMatchesService, private router: Router ) { }

  ngOnInit() {
    this.leagueId = this.upcomingMatchesService.getLeagueId();
    this.scheduledMatches = this.upcomingMatchesService.fetchScheduledMatches(this.leagueId);
  }
  navigateToMatch(matchId: number) {
    this.router.navigate(['/match', matchId]);
  }
}
