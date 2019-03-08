import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line: max-line-length
import { MatToolbarModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSnackBarModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
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
  ],
  exports: [
    MaterialModule,
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
  ],
  declarations: []
})

export class MaterialModule { }
