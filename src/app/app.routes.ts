import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/psychologues', pathMatch: 'full' },

  // Pages publiques
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },

  // Psychologues (public)
  {
    path: 'psychologues',
    loadComponent: () => import('./pages/psychologue-list/psychologue-list.component').then(m => m.PsychologueListComponent)
  },
  {
    path: 'psychologues/:id',
    loadComponent: () => import('./pages/psychologue-detail/psychologue-detail.component').then(m => m.PsychologueDetailComponent)
  },

  // Rendez-vous (connecté)
  {
    path: 'rendezvous/prise',
    loadComponent: () => import('./pages/rdv/rdv.component').then(m => m.PriseRendezvousComponent),
    canActivate: [authGuard]
  },

  // Administration (admin)
  {
    path: 'admin/psychologues',
    loadComponent: () => import('./pages/admin-psychologue-validation/admin-psychologue-validation.component').then(m => m.AdminPsychologueValidationComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/conseils',
    loadComponent: () => import('./pages/admin-conseil-validation/admin-conseil-validation.component').then(m => m.AdminConseilValidationComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },
  { path: 'admin', redirectTo: '/admin/psychologues', pathMatch: 'full' },

  // Espace psychologue (psy)
  {
    path: 'psy/conseils',
    loadComponent: () => import('./pages/psy-mes-conseils/psy-mes-conseils.component').then(m => m.PsyMesConseilsComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: 'PSYCHOLOGUE' }
  },
  {
    path: 'psy/creneaux',
    loadComponent: () => import('./pages/psy-mes-creneaux/psy-mes-creneaux.component').then(m => m.PsyMesCreneauxComponent),
    canActivate: [authGuard, roleGuard],
    data: { role: 'PSYCHOLOGUE' }
  },
  { path: 'psy', redirectTo: '/psy/conseils', pathMatch: 'full' },

  { path: '**', redirectTo: '/psychologues' }
];