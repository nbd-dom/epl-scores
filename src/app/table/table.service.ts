import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Table } from './table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  leagueId = 2021;

  tokens = [
    {token: 'db1b9820c53f4c51a20d451ec99c6e9c', isAvailable: true},
    {token: 'b727806b159248d3a537813836642933', isAvailable: true}
  ];
  tokenIndex = 0;

  getHeaders(){
    let headers: HttpHeaders;
    let isHeadersEmpty = true;
    while(isHeadersEmpty){
      if(this.tokens[this.tokenIndex]["isAvailable"]){
        headers = new HttpHeaders({'X-Auth-Token': this.tokens[this.tokenIndex]["token"]});
        isHeadersEmpty = false;
        if(this.tokenIndex == (this.tokens.length - 1)){
          for(let i = 0; i < this.tokens.length; i++){
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
  fetchLeagueTable(leagueId: number) {
    const url = 'https://api.football-data.org/v2/competitions/' + leagueId +'/standings?standingType=TOTAL';
    var table: Table[] = [];
    this.http.get(url, {headers: this.getHeaders()}).pipe(
      map(res => res)
    ).subscribe(
      res => {
        let resTable: any[] = res["standings"][0]["table"];
        for (let ind = 0; ind < resTable.length; ind++){
          let resTeam = resTable[ind];
          let position = resTeam["position"];
          let teamDetails = resTeam["team"];
          let teamId = teamDetails["id"];
          let teamCrestUrl = teamDetails["crestUrl"];
          if(teamCrestUrl == null || teamCrestUrl == ""){
            teamCrestUrl = 'assets/img/unknown-team-crest.png';
          }
          let teamName = teamDetails["name"];
          let matchPlayed = resTeam["playedGames"];
          let wins = resTeam["won"];
          let draws = resTeam["draw"];
          let loses = resTeam["lost"];
          let goalsFor = resTeam["goalsFor"];
          let goalsAgainst = resTeam["goalsAgainst"];
          let goalsDifference = resTeam["goalDifference"];
          let points = resTeam["points"];
          table.push(new Table(position, teamId, teamCrestUrl,
            teamName, matchPlayed, wins, draws, loses,
            goalsFor, goalsAgainst, goalsDifference, points));
        }
      }
    );
    return table;
  }
}