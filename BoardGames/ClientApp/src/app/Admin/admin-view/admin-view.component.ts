import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddgameComponent } from '../addgame/addgame.component';
import { NotificationService } from 'src/app/shared/alert/notification.service';
import { AdminService } from 'src/app/shared/admin.service';
import { AdminvistordetailsComponent } from '../adminvistordetails/adminvistordetails.component';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit {
  constructor( private _adminService: AdminService,private dialog: MatDialog, private notificationService: NotificationService) {
  }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['gameId','gameName','visitorCount','actions'];
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   searchKey: string;

  
public Array;

// Function to call Game Details Table
public LoadGameTable()
{
  this._adminService.GetVisitorGamesRatingDetails().subscribe(
    result => { this.Array = result;
     this.listData = new MatTableDataSource(this.Array);
     this.listData.sort = this.sort;
     this.listData.paginator = this.paginator;
   console.log('data has come!'); }
    , error => console.error(error));
}

 // Intialize list data and show in Material grid table
  ngOnInit() {
    this.LoadGameTable();
  }

  // Function to clear serach item
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }


  // Function to apply filter on search
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  // Function to call Add Game DialogBox Component- fires on click of "Add button"
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this.dialog.open(AddgameComponent,dialogConfig);
  }

  // Function to call Delete Game - fires on click of "Delete button"
  onDelete(row){ 
    if(confirm('Are you sure to delete this record ?')){
    this._adminService.DeleteGame(row.gameId).subscribe(res=>
      {
        console.log('delete record');
        this.notificationService.warn('! Deleted successfully');
        this.LoadGameTable();
      } , error => console.error(error));
   
    }
  }

// Function to get visitor info on click of visitorCount column
  GetVisitorInfo()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AdminvistordetailsComponent ,dialogConfig);
  }


}
