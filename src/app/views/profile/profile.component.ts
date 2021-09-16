import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router'
import { AuthUser } from "src/app/Model/Auth/AuthUser";
import { ProfileService } from "src/app/services/UsersProfile/Profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  UserId:number;
  user:AuthUser;
  IsLoading:boolean=false;
  constructor(
    private _profileServices:ProfileService,
    private route: ActivatedRoute) {this.IsLoading=true}
  ngOnInit(): void{
    this.UserId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.LoadUserProfileDate();
  }

  LoadUserProfileDate(){
    this._profileServices.GetUserProfile(this.UserId).subscribe((data:AuthUser)=>{
      this.IsLoading=false;
      this.user=data;
      console.log(this.user);
    })
  }
}