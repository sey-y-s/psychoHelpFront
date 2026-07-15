import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Rdv } from './pages/rdv/rdv';
//import {Psychologue} from "./pages/register/psychologue/psychologue";
import {PsychologyLayout} from "./layout/psychologue-layout/psychologue-layout";

export const routes: Routes = [
 {
    path: 'login',
    loadComponent: () =>
      import('./pages/logins/logins')
        .then(m => m.Logins)
  },

  {
    path: 'register/citoyen',
    loadComponent: () =>
      import('./pages/register/citoyen/citoyen')
        .then(m => m.Citoyen)
  },

  {
    path: 'register/admin',
    loadComponent: () =>
      import('./pages/register/admin/admin')
        .then(m => m.Admin)
  },


  // ==========================
  // Prise de rendez-vous citoyen
  // ==========================

  {
    path: 'prendrerdv',
    loadComponent: () =>
      import('./pages/rdv/rdv')
        .then(m => m.Rdv),
    
  },


  // ==========================
  // Espace psychologue
  // ==========================

  {
    path: 'psychologue',
    component: PsychologyLayout,

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/psychologue/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'rendez-vous',
        loadComponent: () =>
          import('./pages/psychologue/rendez-vous/rendez-vous')
            .then(m => m.RendezVous)
      },

      {
        path: 'creneaux',
        loadComponent: () =>
          import('./pages/psychologue/creneaux/creneaux')
            .then(m => m.Creneaux)
      },

      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/psychologue/notifications/notifications')
            .then(m => m.Notifications)
      },

      {
        path: 'conseils',
        loadComponent: () =>
          import('./pages/psychologue/conseils/conseils')
            .then(m => m.Conseils)
      },


      // route par défaut du layout psychologue
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  },


  // ==========================
  // Administration
  // ==========================

  {
    path: 'admin/conseils',
    loadComponent: () =>
      import('./pages/admin-conseil-validation/admin-conseil-validation.component')
        .then(m => m.AdminConseilValidationComponent),

    canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN'
    }
  },


  // ==========================
  // Anciennes routes psy
  // ==========================

  {
    path: 'psy/conseils',
    loadComponent: () =>
      import('./pages/psy-mes-conseils/psy-mes-conseils.component')
        .then(m => m.PsyMesConseilsComponent),

    canActivate: [authGuard, roleGuard],
    data: {
      role: 'PSYCHOLOGUE'
    }
  },


  // ==========================
  // Redirections
  // ==========================

  {
    path: '',
    redirectTo: 'psychologue/dashboard',
    pathMatch: 'full'
  },


  // ==========================
  // Route inconnue (TOUJOURS EN DERNIER)
  // ==========================

  {
    path: '**',
    redirectTo: 'psychologue/dashboard'
  }
];