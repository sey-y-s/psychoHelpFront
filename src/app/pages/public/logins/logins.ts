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
  enCours = false;
  forms: FormGroup;
  motdepassecache = true;
  messageErreur = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notif: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.forms = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      motDePasse: ["", Validators.required],
    });
  }

  login() {

    if (this.forms.invalid) return;
<<<<<<< HEAD:src/app/pages/logins/logins.ts
    this.enCours = true;
    this.auth.login(this.forms.value).subscribe({
=======
    this.isLoading = true;
    this.auth.login(this.forms.value)
    .pipe(
        finalize(() => {
          this.isLoading = false; 
        })
      )
    .subscribe({
>>>>>>> 647b76932177b2b2a97a7ac84a5e0374047dc43b:src/app/pages/public/logins/logins.ts
      next: (res) => {
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
<<<<<<< HEAD:src/app/pages/logins/logins.ts
      error: () => {
        this.enCours = false,
          this.notif.erreur("Erreur lors de votre connection")
=======
      error: (err) => {
        this.isLoading = false;
        this.messageErreur = err.error?.message || "Erreur lors de votre connexion";
        this.cdr.detectChanges();
        //this.notif.erreur(this.messageErreur);
>>>>>>> 647b76932177b2b2a97a7ac84a5e0374047dc43b:src/app/pages/public/logins/logins.ts
      }

    });
  }
}
