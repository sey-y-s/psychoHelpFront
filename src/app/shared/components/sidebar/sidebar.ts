import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnDestroy {
  private subscription: Subscription;

  constructor(
    public auth: AuthService,
    private router: Router,
    private notif: NotificationService
  ) {
    // Surveiller la déconnexion pour rediriger
    this.subscription = this.auth.currentUser$.subscribe(utilisateur => {
      if (!utilisateur) {
        this.router.navigate(['/login']);
      }
    });
  }

  deconnexion(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.notif.succes('Déconnecté avec succès');
        // currentUserSubject est déjà mis à null par le tap() dans logout()
        // la sidebar disparaît automatiquement via app.component.html
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}