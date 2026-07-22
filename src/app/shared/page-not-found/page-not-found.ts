import { Component } from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-page-not-found",
  imports: [RouterLink, MatIconModule],
  templateUrl: "./page-not-found.html",
  styleUrl: "./page-not-found.css",
})
export class PageNotFound {}
