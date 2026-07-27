import { Component } from "@angular/core";
import {CommonModule} from "@angular/common";
import { Test } from "../../../../models/tests";
import { TestCitoyen } from "../../../../core/services/test-citoyen.service";
import { Citoyen } from "../../../public/register/citoyen/citoyen";
import { OnInit, ChangeDetectorRef} from "@angular/core";


@Component({
  selector: "app-test-list",
    standalone: true,

  imports: [CommonModule],
  templateUrl: "./test-list.html",
  styleUrl: "./test-list.css",
})
export class TestList {
  constructor(private testService:TestCitoyen, private cdRef: ChangeDetectorRef,
){}
  testCitoyen:TestCitoyen[]=[];
  ngOnInit(){
    this.testService.getAllTests().subscribe({
      next:(data)=>{
        this.testCitoyen=data;
        this.cdRef.detectChanges();
      }
    })

  }
}
