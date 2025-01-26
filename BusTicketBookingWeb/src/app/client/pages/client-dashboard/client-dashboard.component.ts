import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {

  ads:any=[];
  validateForm! : FormGroup;

  constructor(
    private clientService:ClientService,
    private fb: FormBuilder
  ){}

  getAllAds(){
    this.clientService.getAllAds().subscribe(res=>{
      this.ads = res;
    })
  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      fromPlace : [null,(Validators.required)],
      toPlace : [null,(Validators.required)]
    })
    this.getAllAds();
  }

  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['fromPlace']).value,this.validateForm.get(['toPlace']).value).subscribe(res =>{
      this.ads = res;
    })
  }

  updateImg(img: string): string {
    if (!img) {
      return 'assets/default-image.jpg'; 
    }
    return `data:image/jpeg;base64,${img}`;
  }

}
