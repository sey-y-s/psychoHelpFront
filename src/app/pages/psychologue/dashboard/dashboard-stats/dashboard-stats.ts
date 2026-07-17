import {Component, Input} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {DashboardData} from "../../../../models/dashboard.model";

@Component({
  selector: "app-dashboard-stats",
  imports: [RouterLink, MatIconModule],
  templateUrl: "./dashboard-stats.html",
  styleUrl: "./dashboard-stats.css",
})
export class DashboardStats {

  @Input({ required: true })
  dashboard!: DashboardData;
}
