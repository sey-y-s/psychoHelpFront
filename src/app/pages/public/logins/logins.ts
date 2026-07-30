import { ChangeDetectorRef, Component } from "@angular/core";
import { finalize } from "rxjs";
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NotificationService } from "../../../core/services/notification.service";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: "app-logins",
  standalone: true,
  imports: [
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: "./logins.html",
  styleUrl: "./logins.css",
})
export class Logins {
  isLoading = false;
  forms: FormGroup;
  motdepassecache = true;
  messageErreur = '';
  erreurConnexion = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notif: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.forms = this.fb.group({
      identifiant: ["", Validators.required],
      motDePasse: ["", Validators.required],
    });
  }

  login() {
    this.erreurConnexion = false;
    if (this.forms.invalid) return;
    this.isLoading = true;
    this.auth.login(this.forms.value)
    .pipe(
        finalize(() => {
          this.isLoading = false; 
        })
      )
    .subscribe({
      next: (res) => {
        this.erreurConnexion = false;
        this.notif.succes("Vous êtes connecté(e) avec succès.");

        // this.auth.sauvegarderUtilisateur(res);
        console.log(res);
        if (res.role == "ADMIN") {
          this.router.navigate(["/admin"]);
        } else if (res.role == "CITOYEN") {
          this.router.navigate(["/me"]);
        } else if (res.role == "PSYCHOLOGUE") {
          this.router.navigate(["/psy"]);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.erreurConnexion = true;
        this.messageErreur =
            err.error?.message || "Erreur lors de votre connexion.";
        this.cdr.detectChanges();
      }

    });
  }
}
