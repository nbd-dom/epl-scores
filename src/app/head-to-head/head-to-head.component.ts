import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HeadToHeadService, MatchInfo} from './head-to-head.service';
@Component({
  selector: 'app-head-to-head',
  templateUrl: './head-to-head.component.html',
  styleUrls: ['./head-to-head.component.css']
})
export class HeadToHeadComponent implements OnInit {

  matchId: number;
  matchInfo: MatchInfo[];

  constructor(private route: ActivatedRoute, private headToHeadService: HeadToHeadService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.matchId = +params['id'];
    });
    this.headToHeadService.fetchMatchInfo(this.matchId);
    this.matchInfo = this.headToHeadService.fetchMatchInfo(this.matchId);
  }

}
