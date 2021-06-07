import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-create',
  templateUrl: './confirm-dialog-create.component.html',
  styles: [
  ]
})
export class ConfirmDialogCreateComponent implements OnInit {

  constructor(private createDialogRef: MatDialogRef<ConfirmDialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public charName: string) { }

  ngOnInit(): void {
  }

  create() {
    this.createDialogRef.close(true);
  }

  cancel() {
    this.createDialogRef.close();
  }

}
