import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import { TableComponent } from './table/table.component';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import { TeamComponent } from './team/team.component';
import { TeamMatchComponent } from './team/team-match/team-match.component';
import { TeamPositionComponent } from './team/team-position/team-position.component';
import { TeamSquadComponent } from './team/team-squad/team-squad.component';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { HeadToHeadComponent} from './head-to-head/head-to-head.component';
import { from } from 'rxjs';
const routes: Routes = [
 {path: '', component: AboutComponent},
 { path: 'table' , component : TableComponent },
 { path: 'upcomingMatches', component: UpcomingMatchesComponent },
 {path: 'topScorers', component: TopScorersComponent},
 { path: 'match/:id', component: HeadToHeadComponent},
{
path: 'team/:id',
    component: TeamComponent,
    children: [
      {path: 'team-match', component: TeamMatchComponent},
      {path: 'team-position', component: TeamPositionComponent},
      {path: 'team-squad', component: TeamSquadComponent}
    ]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
