import { Component, OnInit } from '@angular/core';
import {Table} from './table';
import {TableService} from './table.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  table: Table[];
  constructor(private tableService: TableService) { }

  ngOnInit() {
    const leagueId = this.tableService.getLeagueId();
    this.table = this.tableService.fetchLeagueTable(leagueId);
  }

}
