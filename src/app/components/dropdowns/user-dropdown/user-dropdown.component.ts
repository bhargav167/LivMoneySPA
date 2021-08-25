import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { createPopper } from "@popperjs/core";
import { AuthUserResponces } from "src/app/Model/Auth/AuthUserResponces";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  userInfo:AuthUserResponces;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
 
 constructor(private _router: Router) { 
  this.loadUserDataFromLocal();
 }
  ngAfterViewInit() {
  
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
    
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  loadUserDataFromLocal(){
    var user=localStorage.getItem("AuthUser");
    var userInJson=JSON.parse(user);
    this.userInfo=userInJson;
    console.log(this.userInfo);
  }

  LogOut(){
    localStorage.clear();
    this._router.navigateByUrl(`/`);
  }
}
