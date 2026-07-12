import { Component } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { AuthService } from "../../core/services/auth.service";
import { N } from "@angular/cdk/keycodes";

@Component({
  selector: "app-logins",
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./logins.html",
  styleUrl: "./logins.css",
})
export class Logins {
  isLoading = false;
  forms: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.forms = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      motDePasse: ["", Validators.required],
    });
  }

  login() {
    if (this.forms.invalid) return;
    this.isLoading = true;
    this.auth.login(this.forms.value).subscribe({
      next: () => {
        alert("vous êtes connectez avec succes");
        this.router.navigate(["/dashboard"]);
      },
      error: () => (this.isLoading = false),
    });
  }
}
