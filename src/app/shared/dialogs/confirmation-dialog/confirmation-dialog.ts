import {Component, Inject} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-dialog",
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: "./confirmation-dialog.html",
  styleUrl: "./confirmation-dialog.css",
})
export class ConfirmationDialog {

  constructor(
      public dialogRef: MatDialogRef<ConfirmationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmer(): void {
    this.dialogRef.close(true);
  }

  annuler(): void {
    this.dialogRef.close(false);
  }
}
