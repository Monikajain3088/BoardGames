import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../shared/game.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-visitor-rating',
  templateUrl: './visitor-rating.component.html',
  styleUrls: ['./visitor-rating.component.css']
})
export class VisitorRatingComponent implements OnInit {
  constructor(private _gameService: GameService) {

  }
  public starList: boolean[] = [true, true, true, true, true];
  public rating: number;
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['gameId', 'gameName', 'averageRating', 'rating'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  public gameList: any;
  ngOnInit() {
    this._gameService.getGameList().subscribe(
      result => {
        this.gameList = result;
        this.gameList.forEach(element => {
          element.starList = this.starList;
        });
        this.listData = new MatTableDataSource(this.gameList);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        console.log('data has come');
      }
      , error => console.error(error));
  }
  public rownum;
  public setStar(record: any, data: any) {
    this.rownum = data;
    }
  public clickontg(row: any) {
    const ht = row;
    let hat=this.listData.data;
    let tableList = this.gameList.find(function (obj: any) { return obj.gameId === row.gameId; });
      for (let i = 0; i <= 4; i++) {
      if (i <= this.rownum) {
        tableList.starList[i] = false;
      } else {
        tableList.starList[i] = true;
      }
    }
    let hsat=this.listData.data;
   this.listData.data.forEach(element=>{
if(element.gameId==row.gameId)
{
  element.starList=this.starList;
}

   }
    
    );
    let iu=this.listData.data;
  }
}
