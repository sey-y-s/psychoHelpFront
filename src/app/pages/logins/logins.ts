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
import { AuthService } from "../../core/services/auth.service";
import { N } from "@angular/cdk/keycodes";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: "app-logins",
  standalone: true,
  imports: [
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    // MatFormField,
    // MatButton,
    MatProgressBar,
    MatCheckboxModule,
  ],
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
        private notif: NotificationService,
    
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
      next: (res) => {
        this.notif.succes("vous êtes connectez avec succes");
        // this.auth.sauvegarderUtilisateur(res);
      console.log(res);
        if (res.role == "ADMIN") {
          this.router.navigate(["/dashboardAdmin"]);
        } else if (res.role == "CITOYEN") {
          this.router.navigate(["/dashboardCitoyen"]);
        } else if(res.role=="PSYCHOLOGUE") {
          this.router.navigate(["/psychologues"]);
        }
      },
      error: () => {
        this.isLoading = false,
      this.notif.erreur("Erreur lors de votre connection")}

    });
  }
}
