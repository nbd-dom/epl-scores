import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import {UpcomingMatches} from './upcoming-matches';

@Injectable({
  providedIn: 'root'
})
export class UpcomingMatchesService {
  leagueId = 2021;

  tokens = [
    {token: 'db1b9820c53f4c51a20d451ec99c6e9c', isAvailable: true},
    {token: 'b727806b159248d3a537813836642933', isAvailable: true}
  ];
  tokenIndex = 0;

  getHeaders() {
    let headers: HttpHeaders;
    let isHeadersEmpty = true;
    while(isHeadersEmpty) {
      if(this.tokens[this.tokenIndex]["isAvailable"]) {
        headers = new HttpHeaders({'X-Auth-Token': this.tokens[this.tokenIndex]["token"]});
        isHeadersEmpty = false;
        if(this.tokenIndex == (this.tokens.length - 1)) {
          for(let i = 0; i < this.tokens.length; i++) {
            this.tokens[i]["isAvailable"] = true;
          }
          this.tokenIndex = 0;
        } else {
          this.tokens[this.tokenIndex]["isAvailable"] = false;
        }
      } else {
        this.tokenIndex++;
      }
    }
    return headers;
  }

  constructor(private http: HttpClient) { }
  setLeagueId(leagueId) {
    this.leagueId = leagueId;
  }

  getLeagueId() {
    return this.leagueId;
  }
  fetchScheduledMatches(leagueId: number) {
    const urlTeams = 'https://api.football-data.org/v2/competitions/'+ leagueId +'/teams';
    const urlScheduledMatches = 'https://api.football-data.org/v2/competitions/'+ leagueId +'/matches?status=SCHEDULED';
    let obsTeams = this.http.get(urlTeams, {headers: this.getHeaders()}).pipe(map(res => res));
    let obsScheduledMatches = this.http.get(urlScheduledMatches, {headers: this.getHeaders()}).pipe(map(res => res));

    var teamCrestUrls: TeamCrestUrl[] = [];
    var scheduledMatches: UpcomingMatches[] = [];

    forkJoin([obsTeams, obsScheduledMatches]).subscribe(
      res => {
        let resTeams: any[] = res[0]["teams"];
        for(let ind = 0; ind < resTeams.length; ind++) {
          let resTeam = resTeams[ind];
          let teamId = resTeam["id"];
          let teamCrestUrl = resTeam["crestUrl"];
          if(teamCrestUrl == null || teamCrestUrl == "") {
            teamCrestUrl = 'assets/img/unknown-team-crest.png';
          }
          teamCrestUrls.push(new TeamCrestUrl(teamId, teamCrestUrl));
        }

        let resMatches: any[] = res[1]["matches"];
        for(let ind = 0; ind < resMatches.length; ind++) {
          let resMatch = resMatches[ind];
          let matchId = resMatch["id"];
          let datetime = new Date(resMatch["utcDate"]);
          let date = datetime.getDate() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getFullYear();
          let hoursStr = (datetime.getHours() < 10) ? ('0' + datetime.getHours()) : ('' + datetime.getHours());
          let minutesStr = (datetime.getMinutes() < 10) ? ('0' + datetime.getMinutes()) : ('' + datetime.getMinutes());
          let time = hoursStr + ":" + minutesStr;
          let status = resMatch["status"];
          let score = resMatch["score"];
          let ftScore = score["fullTime"];
          let ftHomeScore = ftScore["homeTeam"];
          let ftAwayScore = ftScore["awayTeam"];
          let homeTeamRes = resMatch["homeTeam"];
          let homeTeamId = homeTeamRes["id"];
          let homeTeamName = homeTeamRes["name"];
          let awayTeamRes = resMatch["awayTeam"];
          let awayTeamId = awayTeamRes["id"];
          let awayTeamName = awayTeamRes["name"];
          let homeTeamCrestUrl = "";
          let awayTeamCrestUrl = "";

          for(let crestInd = 0; crestInd < teamCrestUrls.length; crestInd++) {
            if(homeTeamId == teamCrestUrls[crestInd].teamId) {
              homeTeamCrestUrl = teamCrestUrls[crestInd].teamCrestUrl;
            }
            if(awayTeamId == teamCrestUrls[crestInd].teamId) {
              awayTeamCrestUrl = teamCrestUrls[crestInd].teamCrestUrl;
            }
          }

          scheduledMatches.push(new UpcomingMatches(matchId, date, time, status,
            ftHomeScore, ftAwayScore, homeTeamId, awayTeamId,
            homeTeamName, awayTeamName, homeTeamCrestUrl, awayTeamCrestUrl));
        }
      }
    );
    return scheduledMatches;
  }
}
class TeamCrestUrl {
  constructor(
    public teamId: number,
    public teamCrestUrl: string
  ) { }
}
