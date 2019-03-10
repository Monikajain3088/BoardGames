import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-adminvistordetails',
  templateUrl: './adminvistordetails.component.html',
  styleUrls: ['./adminvistordetails.component.css']
})
export class AdminvistordetailsComponent implements OnInit {
  private rowdata:any;
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['visitorName','visitorRating'];
  constructor(private _adminService: AdminService,private dialog: MatDialog ,
    private dialogRef:MatDialogRef<AdminvistordetailsComponent>) { 
     this.rowdata=this._adminService.rowData;
    this.listData = new MatTableDataSource(this.rowdata);
   // this.listData.sort = this.sort;
   // this.listData.paginator = this.paginator;   
  }

  

  ngOnInit() {     
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
