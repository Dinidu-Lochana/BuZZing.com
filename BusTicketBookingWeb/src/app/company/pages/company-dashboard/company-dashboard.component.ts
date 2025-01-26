import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent {

  bookings:any;
  validateForm! : FormGroup;
  

  constructor(private companyService :CompanyService,
    private notification : NzNotificationService,
    private fb: FormBuilder,
    private router: Router
   ){}

  ngOnInit(){
    this.getAllBookings();
    this.validateForm = this.fb.group({
      bookdate : [null,(Validators.required)]
    })
  }

  getAllBookings(){
    this.companyService.getAllBookings().subscribe(res=>{
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingId: number, status:string){
    this.companyService.changeBookingStatus(bookingId,status).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `Booking Status changed Successfully`,
        {nzDuration:5000}
      );
      this.getAllBookings();
    }, error=>{
      this.notification
      .error(
        'ERROR',
        `${error.message}`,
        {nzDuration:5000}
      )
    })
  }


  searchBookingByDate(){
    this.companyService.searchBookingByDate(this.validateForm.get(['bookdate']).value).subscribe(res =>{
      this.bookings = res;
    })
  }

  clearFilter(): void {
    this.validateForm.reset();
    window.location.reload();
    
  }

}
