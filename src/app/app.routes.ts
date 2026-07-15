import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
//import {Psychologue} from "./pages/register/psychologue/psychologue";
import {MainLayout} from "./layout/main-layout/main-layout";

export const routes: Routes = [
 //  { path: '', redirectTo: '/psychologues', pathMatch: 'full' },
 //
 //  // Pages publiques
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
 
  //chemin pour acceder a la page d´inscription d´un psy
  {
    path: 'register/psychologue',
    loadComponent: () => import('./pages/register/psychologue/psychologue').then(m => m.Psychologue)
  },
 
   //chemin pour acceder a la page d´inscription d´un citoyen
  {
    path: 'register/citoyen',
    loadComponent: () => import('./pages/register/citoyen/citoyen').then(m => m.Citoyen)
  },
 
   //chemin pour acceder a la page d´inscription d´un admin
  {
    path: 'register/admin',
    loadComponent: () => import('./pages/register/admin/admin').then(m => m.Admin)
  },
 //
 //  // Psychologues (public)
 //  {
 //    path: 'psychologues',
 //    loadComponent: () => import('./pages/psychologue-list/psychologue-list.component').then(m => m.PsychologueListComponent)
 //  },
 //  {
 //    path: 'psychologues/:id',
 //    loadComponent: () => import('./pages/psychologue-detail/psychologue-detail.component').then(m => m.PsychologueDetailComponent)
 //  },
 //
 //  // Rendez-vous (connecté)
 //  {
 //    path: 'rendezvous/prise',
 //    loadComponent: () => import('./pages/rdv/rdv.component').then(m => m.PriseRendezvousComponent),
 //    canActivate: [authGuard]
 //  },
 //
 //  // Administration (admin)
 //  {
 //    path: 'admin/psychologues',
 //    loadComponent: () => import('./pages/admin-psychologue-validation/admin-psychologue-validation.component').then(m => m.AdminPsychologueValidationComponent),
 //    canActivate: [authGuard, roleGuard],
 //    data: { role: 'ADMIN' }
 //  },
 //  //{
 // //   path: 'admin/conseils',
 // //   loadComponent: () => import('./pages/admin-conseil-validation/admin-conseil-validation.component').then(m => m.AdminConseilValidationComponent),
 // //   canActivate: [authGuard, roleGuard],
 // //   data: { role: 'ADMIN' }
 // // },
 //  //{ path: 'admin', redirectTo: '/admin/psychologues', pathMatch: 'full' },
 //
 //  // Espace psychologue (psy)
 //  {
 //    path: 'psy/conseils',
 //    loadComponent: () => import('./pages/psy-mes-conseils/psy-mes-conseils.component').then(m => m.PsyMesConseilsComponent),
 //    canActivate: [authGuard, roleGuard],
 //    data: { role: 'PSYCHOLOGUE' }
 //  },
 //  {
 //    path: 'psy/creneaux',
 //    loadComponent: () => import('./pages/psy-mes-creneaux/psy-mes-creneaux.component').then(m => m.PsyMesCreneauxComponent),
 //    canActivate: [authGuard, roleGuard],
 //    data: { role: 'PSYCHOLOGUE' }
 //  },
 //  //{ path: 'psy', redirectTo: '/psy/conseils', pathMatch: 'full' },
 //
 //  //{ path: '**', redirectTo: '/psychologues' },

  {
    path: 'psychologue',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/psychologue/dashboard/dashboard')
                .then(m => m.Dashboard),
          data: {
              title: 'Dashboard'
          }
      },
      {
        path: 'rendez-vous',
        loadComponent: () =>
            import('./pages/psychologue/rendez-vous/rendez-vous')
                .then(m => m.RendezVousComponent),
          data: {
              title: 'Mes rendez-vous'
          }
      },
      {
        path: 'creneaux',
        loadComponent: () =>
            import('./pages/psychologue/creneaux/creneaux')
                .then(m => m.Creneaux),
          data: {
              title: 'Mes Creneaux'
          }
      },
      {
        path: 'notifications',
        loadComponent: () =>
            import('./pages/psychologue/notifications/notifications')
                .then(m => m.Notifications),
          data: {
              title: 'Notifications'
          }
      },
      {
        path: 'conseils',
        loadComponent: () =>
            import('./pages/psychologue/conseils/conseils')
                .then(m => m.Conseils),
          data: {
              title: 'Conseils'
          }
      },
        {
            path: '',
            redirectTo: 'psychologue/dashboard',
            pathMatch: 'full'
        },
    ]
  },
  {
  path: 'psychologue-validation',
  loadComponent: () =>
    import('./pages/admin-psychologue-validation/admin-psychologue-validation.component')
      .then(m => m.AdminPsychologueValidationComponent)
},
  
  {
    path: '',
    redirectTo: 'psychologue/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'psychologue/dashboard'
  }
];