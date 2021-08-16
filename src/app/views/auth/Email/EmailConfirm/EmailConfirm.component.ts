import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailSenderService } from 'src/app/services/Email/EmailSender.service';

@Component({
  selector: 'app-EmailConfirm',
  templateUrl: './EmailConfirm.component.html',
  styleUrls: ['./EmailConfirm.component.css']
})
export class EmailConfirmComponent implements OnInit {
  public isConfirm:boolean;
  token: string;
  email: string;
  constructor(private route: ActivatedRoute,
    private _emailServices: EmailSenderService) { 
      this.route.queryParams
      .subscribe(params => {
        this.email = params.email;
        this.token = params.token;
        this.ConfirmEmail();
      }
      );
  }

  ngOnInit() {
  }
  ConfirmEmail() {
    this._emailServices.confirmmail(this.email,this.token).subscribe((data:boolean)=>{
      if(data==true){
        this.isConfirm=true
        return;
      }
      this.isConfirm = false;
    },error=>{
      this.isConfirm = false;
    })
   
  }
}
