import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailSenderService } from 'src/app/services/Email/EmailSender.service';

@Component({
  selector: 'app-EmailSent',
  templateUrl: './EmailSent.component.html',
  styleUrls: ['./EmailSent.component.css']
})
export class EmailSentComponent implements OnInit {
 public isSent:boolean;
  token:string; 
  email:string;
  constructor(private route: ActivatedRoute,
    private _emailServices: EmailSenderService) {
    this.route.queryParams
      .subscribe(params => {
        this.email = params.email;
        this.token = params.token;
        this.IsTokenMatch();
      }
      );
  }
  ngOnInit() { 
  }
  IsTokenMatch(){
    this._emailServices.IsToken(this.email,this.token).subscribe((data:boolean)=>{ 
      if(data==true){
        this.isSent=true;
        return;
      }
      this.isSent=false;
    },error=>{ 
      this.isSent=false; 
      console.log(error);
    })
  }
}
