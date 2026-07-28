import { Component } from "@angular/core";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: "app-refus-dialog",
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: "./refus-dialog.html",
  styleUrl: "./refus-dialog.css",
})
export class RefusDialog {

  motif = '';

  constructor(
      private dialogRef: MatDialogRef<RefusDialog>
  ) {}

  annuler(): void {
    this.dialogRef.close();
  }

  confirmer(): void {

    if (!this.motif.trim()) {
      return;
    }

    this.dialogRef.close(this.motif);

  }
}
