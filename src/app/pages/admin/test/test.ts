import { Component } from "@angular/core";
import {RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: "app-test",
    imports: [
        RouterLink,
      RouterModule
    ],
  templateUrl: "./test.html",
  styleUrl: "./test.css",
})
export class Test {

}
