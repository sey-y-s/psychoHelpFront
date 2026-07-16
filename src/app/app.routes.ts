import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { MainLayout } from "./layout/main-layout/main-layout";

export const routes: Routes = [
  // =========================================================================
  // ROUTES PUBLIQUES
  // =========================================================================
  {
    path: '',
    loadComponent: () => import('./pages/accueil/accueil').then(m => m.Accueil)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/logins/logins').then(m => m.Logins)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'register/psychologue',
    loadComponent: () => import('./pages/register/psychologue/psychologue').then(m => m.Psychologue)
  },
  {
    path: 'register/citoyen',
    loadComponent: () => import('./pages/register/citoyen/citoyen').then(m => m.Citoyen)
  },
  {
    path: 'register/admin',
    loadComponent: () => import('./pages/register/admin/admin').then(m => m.Admin)
  },

  // =========================================================================
  // ESPACE PSYCHOLOGUE
  // =========================================================================
  {
    path: 'psy',
    component: MainLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'PSYCHOLOGUE' }, // Transmis au roleGuard
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/psychologue/dashboard/dashboard').then(m => m.Dashboard),
        data: { title: 'Dashboard' }
      },
      {
        path: 'rendez-vous',
        loadComponent: () => import('./pages/psychologue/rendez-vous/rendez-vous').then(m => m.RendezVousComponent),
        data: { title: 'Mes rendez-vous' }
      },
      {
        path: 'creneaux',
        loadComponent: () => import('./pages/psychologue/creneaux/creneaux').then(m => m.Creneaux),
        data: { title: 'Mes Creneaux' }
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/psychologue/notifications/notifications').then(m => m.Notifications),
        data: { title: 'Notifications' }
      },
      {
        path: 'conseils',
        loadComponent: () => import('./pages/psychologue/conseils/conseils').then(m => m.Conseils),
        data: { title: 'Conseils' }
      }
    ]
  },

  // =========================================================================
  // ESPACE ADMIN
  // =========================================================================
  {
    path: 'admin',
    component: MainLayout, // Utilise également le MainLayout s'il est partagé
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }, // Transmis au roleGuard
    children: [
      {
        path: '',
        redirectTo: 'psychologues',
        pathMatch: 'full'
      },
      {
        path: 'psychologues',
        loadComponent: () => import('./pages/admin-psychologue-validation/admin-psychologue-validation.component').then(m => m.AdminPsychologueValidationComponent),
        data: { title: 'Validation Psychologues' }
      }
    ]
  },

  // Redirection par défaut si la route n'existe pas
  { 
    path: '**', 
    redirectTo: '' 
  }
];