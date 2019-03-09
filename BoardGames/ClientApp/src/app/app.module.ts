import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VisitorRatingComponent } from './visitor-rating/visitor-rating.component';
import {MatTableModule} from '@angular/material/table';

import { MatSortModule, MatPaginatorModule, MatToolbarModule, MatGridListModule,
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatCheckboxModule,
   MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSnackBarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamedashboardComponent } from './admin/gamedashboard/gamedashboard.component';
import { AddgameComponent } from './admin/addgame/addgame.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VisitorRatingComponent,
    AdminViewComponent,
    GamedashboardComponent,
    AddgameComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'visitor-rating', component: VisitorRatingComponent },
      { path: 'admin-view', component: AdminViewComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddgameComponent]
})
export class AppModule { }
