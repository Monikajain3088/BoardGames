import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../shared/game.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-visitor-rating',
  templateUrl: './visitor-rating.component.html',
  styleUrls: ['./visitor-rating.component.css']
})
export class VisitorRatingComponent implements OnInit {
  constructor(private _gameService: GameService, private formBuilder: FormBuilder) {

  }
  visitorForm: FormGroup;
  submitted = false;

  public starList: boolean[] = [true, true, true, true, true];
  public rating: number;
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['srno', 'gameName', 'averageRating', 'rating'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  public gameList: any;

  ngOnInit() {

    this.visitorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this._gameService.getGameList().subscribe(
      result => {
        let i: number = 1;
        this.gameList = result;
        this.gameList.forEach(element => {
          element.starList = this.starList;
          element.srno = i;
          i = i + 1;
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
    let hat = this.listData.data;
    let tableList = this.gameList.find(function (obj: any) { return obj.gameId === row.gameId; });
    for (let i = 0; i <= 4; i++) {
      if (i <= this.rownum) {
        tableList.starList[i] = false;
      } else {
        tableList.starList[i] = true;
      }
    }
    let hsat = this.listData.data;
    this.listData.data.forEach(element => {
      if (element.gameId == row.gameId) {
        element.starList = this.starList;
      }

    }

    );
    let iu = this.listData.data;
  }
  // convenience getter for easy access to form fields
  get f() { return this.visitorForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.visitorForm.invalid) {
      return;
    }

    //alert('SUCCESS!! :-)')
  }
}
