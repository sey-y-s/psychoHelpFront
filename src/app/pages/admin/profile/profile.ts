import {ChangeDetectorRef, Component, inject, OnInit} from "@angular/core";
import {ProfileService} from "../../../core/services/profile";
import {ProfileModel} from "../../../models/profile.model";
import {Router} from "@angular/router";

@Component({
  selector: "app-profile",
  imports: [],
  templateUrl: "./profile.html",
  styleUrl: "./profile.css",
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);
  constructor(private cdRef: ChangeDetectorRef, private router: Router) {
  }
  profile! : ProfileModel

  ngOnInit(): void {
    this.getProfile()
    //this.notifService.succes("test")
  }

  getProfile(): void{
    this.profileService.getProfile().subscribe({
      next: data => {
        this.profile = data;
        this.cdRef.detectChanges();
        console.log(this.profile);
      }
    })
  }

  edit(adminId: number) {
    this.router.navigate([
      "/admin/profile/modifier",
      adminId
    ]);
  }
}
