import { Component } from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {SidebarLayout} from "../sidebar-layout/sidebar-layout";
import {NavbarLayout} from "../navbar-layout/navbar-layout";

@Component({
  selector: "app-psychologue-layout",
  imports: [ RouterOutlet, SidebarLayout, NavbarLayout],
  templateUrl: "./psychologue-layout.html",
  styleUrl: "./psychologue-layout.css",
})
export class PsychologyLayout {}
