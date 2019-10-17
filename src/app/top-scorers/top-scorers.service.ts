import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TopScorersService {
  leagueId = 2021;

  tokens = [
    {token: 'db1b9820c53f4c51a20d451ec99c6e9c', isAvailable: true},
    {token: 'b727806b159248d3a537813836642933', isAvailable: true}
  ];
  tokenIndex = 0;

  getHeaders(){
    let headers: HttpHeaders;
    let isHeadersEmpty = true;
    while (isHeadersEmpty){
      if (this.tokens[this.tokenIndex]["isAvailable"]){
        headers = new HttpHeaders({'X-Auth-Token': this.tokens[this.tokenIndex]["token"]});
        isHeadersEmpty = false;
        if (this.tokenIndex == (this.tokens.length - 1)){
          for (let i = 0; i < this.tokens.length; i++){
            this.tokens[i]["isAvailable"] = true;
          }
          this.tokenIndex = 0;
        }
        else {
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
  fetchTopScorers(leagueId: number) {
    const urlTeams = 'https://api.football-data.org/v2/competitions/' + leagueId + '/teams';
    const urlScorers = 'https://api.football-data.org/v2/competitions/' + leagueId + '/scorers';
    let obsTeams = this.http.get(urlTeams, {headers: this.getHeaders()}).pipe(map(res => res));
    let obsScorers = this.http.get(urlScorers, {headers: this.getHeaders()}).pipe(map(res => res));

    var teamCrestUrls: TeamCrestUrl[] = [];
    var topScorers: LeagueScorer[] = [];

    forkJoin([obsTeams, obsScorers]).subscribe(
      res => {
        let resTeams: any[] = res[0]["teams"];
        for (let ind = 0; ind < resTeams.length; ind++) {
          let resTeam = resTeams[ind];
          let teamId = resTeam["id"];
          let teamCrestUrl = resTeam["crestUrl"];
          if (teamCrestUrl == null || teamCrestUrl == ""){
            teamCrestUrl = 'assets/img/unknown-team-crest.png';
          }
          teamCrestUrls.push(new TeamCrestUrl(teamId, teamCrestUrl));
        }

        let resScorers: any[] = res[1]["scorers"];
        for (let ind = 0; ind < resScorers.length; ind++) {
          let resScorer = resScorers[ind];
          let resPlayer = resScorer["player"];
          let playerName = resPlayer["name"];
          let goals = resScorer["numberOfGoals"];
          let resTeam = resScorer["team"];
          let teamId = resTeam["id"];
          let teamCrestUrl = "";

          for (let crestInd = 0; crestInd < teamCrestUrls.length; crestInd++) {
            if (teamId == teamCrestUrls[crestInd].teamId){
              teamCrestUrl = teamCrestUrls[crestInd].teamCrestUrl;
            }
          }

          topScorers.push(new LeagueScorer(playerName, goals, teamCrestUrl));
        }
      }
    );
    return topScorers;
  }
}
class TeamCrestUrl {
  constructor(
    public teamId: number,
    public teamCrestUrl: string
  ) {}
}
export class LeagueScorer {
  constructor(
      public playerName: string,
      public goals: number,
      public teamCrestUrl: string
  ){}
}
