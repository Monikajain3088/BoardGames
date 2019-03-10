import { Component, OnInit } from '@angular/core';
import {AdminService} from 'src/app/shared/admin.service';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-addgame',
  templateUrl: './addgame.component.html',
  styleUrls: ['./addgame.component.css']
})
export class AddgameComponent implements OnInit {
public gamename='';

  constructor(private _adminService: AdminService) { }

  //Function to add Game
public onAdd()
{
  this._adminService.AddGame(this.gamename).subscribe(
    result => { 
      console.log('game added');
      
    }, error => console.error(error));
}

  ngOnInit() {
   
  }

}
