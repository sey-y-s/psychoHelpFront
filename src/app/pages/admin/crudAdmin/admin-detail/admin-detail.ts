import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../../../models/admin.model';
import { AdminDashboardService } from '../../../../core/services/admin.dashboard.service';
import { AdminAdd } from '../../../../models/adminAdd.model';
import {  ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-admin-detail",
     standalone: true,

  imports: [],
  templateUrl: "./admin-detail.html",
  styleUrl: "./admin-detail.css",
})
export class AdminDetail {
   admin!: AdminAdd;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminDashboardService,
      private cdRef: ChangeDetectorRef,
  ) {}


  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.adminService.AdminById(id).subscribe({
      next: (data) => {
        this.admin = data;
                  this.cdRef.detectChanges();

      }
    });

  }


  redirectList() {
    this.router.navigate(['/admin/admins']);
  }
}
