import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/Model/AuthUser';
import { AuthenticationService } from 'src/app/services/Auth/Authentication.service';
import { EmailBody } from 'src/app/Model/Email/EmailBody';
import { EmailSenderService } from 'src/app/services/Email/EmailSender.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  authUserFields: FormGroup;
  authUser: AuthUser;
  email:EmailBody;
  IsTAC:boolean;
  public btnLoader: boolean;
  constructor(private fb: FormBuilder,
      private _authServicres: AuthenticationService,
      private _emailServices:EmailSenderService,
      private _router: Router,
      private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createAuthUserForm();
  }
  createAuthUserForm() {
    this.authUserFields = this.fb.group({ 
      Name: ['', Validators.required],
      Email: ['', [Validators.email,Validators.required]],
      Password: ['', Validators.required],
      ModOfRegistration:[],
      TAC:[false]
    })
  }
  
  //Send Email Method
  SendMail(mail:EmailBody){  
    this._emailServices.sendmail(mail).subscribe((data: EmailBody) => {
      
    })
  }
  register() {
    this.btnLoader = true;
    if (this.authUserFields.valid) {
      if (this.authUserFields.get('TAC').value == false) {
        this.IsTAC = false;
        this.btnLoader = false;
        return;
      } else {
        this.IsTAC = true;
        this.btnLoader = true;
        this.authUser = Object.assign({}, this.authUserFields.value);
        this.authUser.ModOfRegistration = "CustomLogin"; 
        this._authServicres.AuthRegister(this.authUser).subscribe((data:AuthUser) => { 
          this.toastr.success(`Hi! ${this.authUserFields.get('Name').value} You have successfully register to livmoney`, '', { timeOut: 3000 });
          //Send Email
          let mail={
            owneremail:'',
            useremail:'',
            mailBody:''
          };
          mail.owneremail='liv@livsolution.co.in';
          mail.useremail=this.authUser.Email;
          mail.mailBody=`http://localhost:4200/auth/EmailConfirm?email=${this.authUser.Email}&token=${data.Token}`;
          this.SendMail(mail);
          this.authUserFields.reset();
          this.btnLoader = false;
          this.createAuthUserForm();
          this._router.navigateByUrl(`/auth/EmailSent?email=${this.authUser.Email}&token=${data.Token}`);
        }, error => {
          this.toastr.error('Registration Failed!', 'Problem in saving Data', error);
          this.btnLoader = false;
        }, () => {
         });
      }
    }
  }
}
