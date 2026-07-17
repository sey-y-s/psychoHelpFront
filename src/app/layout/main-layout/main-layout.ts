import { Component, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import {RouterOutlet} from "@angular/router";
import {SidebarLayout} from "../sidebar-layout/sidebar-layout";
import {NavbarLayout} from "../navbar-layout/navbar-layout";
import { SpinnerComponent } from "../../shared/components/spinner.component";

@Component({
  selector: "app-main-layout",
  imports: [ RouterOutlet, SidebarLayout, NavbarLayout, SpinnerComponent, AsyncPipe],
  templateUrl: "./main-layout.html",
  styleUrl: "./main-layout.css",
})

export class MainLayout implements OnInit {
  initialise = false;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    // Attendre que la vérification de session soit terminée
    this.auth.currentUser$.subscribe(() => {
      this.initialise = this.auth.estInitialise();
    });
  }
}