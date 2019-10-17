import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TableComponent } from './table/table.component';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import { TeamComponent } from './team/team.component';
import { TeamMatchComponent } from './team/team-match/team-match.component';
import { TeamPositionComponent } from './team/team-position/team-position.component';
import { TeamSquadComponent } from './team/team-squad/team-squad.component';
import { HeadToHeadComponent } from './head-to-head/head-to-head.component';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TableComponent,
    UpcomingMatchesComponent,
    HeadToHeadComponent,
    TopScorersComponent,
    TeamComponent,
    TeamMatchComponent,
    TeamPositionComponent,
    TeamSquadComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
