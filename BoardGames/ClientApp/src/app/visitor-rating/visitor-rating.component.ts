import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService} from '../shared/game.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-visitor-rating',
  templateUrl: './visitor-rating.component.html',
  styleUrls: ['./visitor-rating.component.css']
})
export class VisitorRatingComponent implements OnInit {
  constructor( private _gameService: GameService) {

  }
 public listData: MatTableDataSource<any>;
 public displayedColumns: string[] = ['gameId','gameName','averageRating','rating'];
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   searchKey: string;

private game;
public ArrayNItin;

public Gt;
  ngOnInit() {
   this._gameService.getGameList().subscribe(
     result => { this.ArrayNItin = result;
      this.listData = new MatTableDataSource(this.ArrayNItin);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    console.log('data has come'); }
     , error => console.error(error));
     
  //  this.listData.sort = this.sort;
  //  this.listData.paginator = this.paginator;
  //  this.listData.filterPredicate = (data, filter) => {
  //    return this.displayedColumns.some(ele => {
  //      return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //    });
// tslint:disable-next-line: comment-format
   ///};
  }

}
