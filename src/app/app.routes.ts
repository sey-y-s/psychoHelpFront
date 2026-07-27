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
    loadComponent: () => import('./pages/public/accueil/accueil').then(m => m.Accueil)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/logins/logins').then(m => m.Logins)
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  // },
  {
    path: 'register/psychologue',
    loadComponent: () => import('./pages/public/register/psychologue/psychologue').then(m => m.Psychologue)
  },
  {
    path: 'register/citoyen',
    loadComponent: () => import('./pages/public/register/citoyen/citoyen').then(m => m.Citoyen)
  },
  {
    path: 'register/admin',
    loadComponent: () => import('./pages/public/register/admin/admin').then(m => m.Admin)
  },


  // =========================================================================
  // ESPACE CITOYEN
  // =========================================================================

  {
    path: 'me',
    component: MainLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'CITOYEN' }, // Transmis au roleGuard
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/citoyen/dashboard/dashboard').then(m => m.Dashboard),
        data: { title: 'Dashboard' }
      },

      {
        path: 'rendez-vous',
        loadComponent: () => import('./pages/citoyen/rendezvous/rendezvous').then(m => m.Rendezvous),
        data: { title: 'Mes rendez-vous' }
      },
      {
        path: 'rendez-vous/:id',
        loadComponent: () => import('./pages/citoyen/detail-rendezvous/detail-rendezvous').then(m => m.DetailRendezvous),
        data: { title: 'Détail du rendez-vous' }
      },
      {
        path: 'psychologues',
        loadComponent: () => import('./pages/citoyen/psychologues/psychologue-list.component').then(m => m.PsychologueListComponent),
        data: { title: 'Psychologues' }
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/citoyen/categories/categorie-test').then(m => m.CategorieTestComponent),
        data: { title: 'Categories' }
      },

      {
        path: 'categories/:id/tests',
        loadComponent: () => import('./pages/citoyen/tests/test').then(m => m.TestComponent),
        data: { title: 'Tests disponibles' }
      },
      {
        path: 'categories/:id/tests/:id',
        loadComponent: () => import('./pages/citoyen/tests/show-test/tests').then(m => m.Tests),
        data: { title: 'Test' }
      },
      {
        path: 'categories/:id/tests/:id/resultats',
        loadComponent: () => import('./pages/citoyen/resultat-test/resultat-test').then(m => m.ResultatTest),
        data: { title: 'Test' }
      },
      {
        path: 'psychologues/:id',
        loadComponent: () => import('./pages/citoyen/psychologue-detail/psychologue-detail').then(m => m.PsychologueDetail)
      },
      {
        path: 'psychologues/:id/creneaux',
        loadComponent: () => import('./pages/citoyen/rdv/rdv').then(m => m.Rdv)
      },
      {
        path:"conseils" ,
        loadComponent: () => import('./pages/citoyen/conseils/list-conseil-citoyen').then(m => m.ListConseilCitoyen),
        data: { title: 'Conseils' }
      },
      {
        path:"conseils/:id",
        loadComponent: () => import('./pages/citoyen/conseils/show-conseil/show-conseil').then(m => m.ShowConseil),
        data: { title: 'Conseils' }
      }
    ]
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
    component: MainLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }, // Transmis au roleGuard
    children: [
      {
        path: 'dashboard',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard),
        data: { title: 'Dashboard' }
      },
      {
        path: 'psychologues',
        loadComponent: () => import('./pages/admin/psys/admin-psy-en-attente').then(m => m.AdminPsyEnAttente),
        data: { title: 'Validation Psychologues' }
      },
      {
        path: 'psychologues',
        loadComponent: () => import('./pages/admin/psys/admin-psy-en-attente').then(m => m.AdminPsyEnAttente),
        data: { title: 'Validation Psychologues' }
      },
      {
        path: 'conseils',
        loadComponent: () => import('./pages/admin/conseils/liste-conseil-admin-component').then(m => m.ListeConseilAdminComponent),
        data: { title: 'Liste des conseils' }
      }
    ]
  },

  
  {
    path: '404',
    loadComponent: () => import('./shared/page-not-found/page-not-found').then(m => m.PageNotFound)
  },

  // Redirection par défaut si la route n'existe pas
  // TODO : Page 404
  {
    path: '**',
    redirectTo: '404'
  }
];
