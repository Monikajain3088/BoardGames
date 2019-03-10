import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-adminvistordetails',
  templateUrl: './adminvistordetails.component.html',
  styleUrls: ['./adminvistordetails.component.css']
})
export class AdminvistordetailsComponent implements OnInit {

  constructor(private _adminService: AdminService,private dialog: MatDialog) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['visitorName','rating'];
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   searchKey: string;
   public Array;
  ngOnInit() {

    this._adminService.GetVisitorGamesRatingDetails().subscribe(
      result => { this.Array = result;
       this.listData = new MatTableDataSource(this.Array);
       this.listData.sort = this.sort;
       this.listData.paginator = this.paginator;
     console.log('data has come!'); }
      , error => console.error(error));
  }

}
