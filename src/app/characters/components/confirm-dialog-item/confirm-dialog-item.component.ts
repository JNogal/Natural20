import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemDto } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'app-confirm-dialog-item',
  templateUrl: './confirm-dialog-item.component.html',
  styleUrls: [],
})
export class ConfirmDialogItemComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) public item?: ItemDto
  ) {}

  ngOnInit(): void {}

  delete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }
}
