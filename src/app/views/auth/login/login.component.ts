import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms"; 
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthUser } from 'src/app/Model/Auth/AuthUser';
import { AuthUserResponces } from 'src/app/Model/Auth/AuthUserResponces';
import { LoginModal } from 'src/app/Model/Auth/LoginModal';
import { AuthenticationService } from 'src/app/services/Auth/Authentication.service';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  authUserFields: FormGroup;
  loginFields: FormGroup;
  authUser: AuthUser;
  loginUser: LoginModal;
  public btnLoader: boolean;
  constructor(private fb: FormBuilder, 
    private authService: SocialAuthService,
      private _authServicres: AuthenticationService,
      private _router: Router) { }

      createAuthUserForm() {
        this.authUserFields = this.fb.group({ 
          Name: ['', Validators.required],
          Email: ['', [Validators.email,Validators.required]],
          Password: ['', Validators.required],
          ModOfRegistration:[],
          ImageUrl:[''],
          TAC:[false]
        })
      }
      //Login Form
      createLoginForm() {
        this.loginFields = this.fb.group({
          Email: ['', [Validators.email,Validators.required]],
          Password: ['', Validators.required]
        })
      }
  ngOnInit(): void { this.createAuthUserForm(); this.createLoginForm();}

// Custom Login
  Login() {
    if (this.loginFields.valid) {
      this.loginUser = Object.assign({}, this.loginFields.value);
      console.log(this.loginUser);
      this._authServicres.AuthLogin(this.loginUser).subscribe((data: AuthUserResponces) => {
        if (data.Status == 209)
          return alert("No User avalable with email address");

        localStorage.setItem("AuthUser", JSON.stringify(data));
        this.loginFields.reset();
        this._router.navigateByUrl(`/admin/dashboard`);
      }, error => {
        return alert("Something went wrong");
      })
    }
  }

    // Google Login
    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data: any) => {
        // Initilized Google Responce
        this.authUserFields.get('Name').setValue(data.name);
        this.authUserFields.get('Email').setValue(data.email);
        this.authUserFields.get('Password').setValue(data.authToken);
        this.authUserFields.get('ModOfRegistration').setValue(data.provider);
        this.authUserFields.get('ImageUrl').setValue(data.photoUrl);
        this.authUser = Object.assign({}, this.authUserFields.value);
              if (this.authUserFields.valid) {   
                  this._authServicres.AuthRegister(this.authUser).subscribe((data:AuthUserResponces) => { 
                    localStorage.setItem("AuthUser",JSON.stringify(data));
                  //  this.toastr.success(`Hi! ${this.authUserFields.get('Name').value} You have successfully register to livmoney`, '', { timeOut: 3000 }); 
                    this.authUserFields.reset(); 
                    this.createAuthUserForm(); 
                    this._router.navigateByUrl(`/admin/dashboard`);
                  }, error => {
                    this.authUserFields.reset(); 
                    this.createAuthUserForm(); 
                    this.btnLoader = false;
                  }, () => {
                   });
              }
            });
    }
}
