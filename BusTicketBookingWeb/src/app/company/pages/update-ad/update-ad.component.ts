import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {

  adId:any = this.activatedroute.snapshot.params['id'];

  
  
 
  getAdById(){
    this.companyService.getAdById(this.adId).subscribe(res=>{
      console.log(res);
      this.validateForm.patchValue(res);
       
    })
  }

  validateForm!: FormGroup;
  selectedFile: File | null = null;
  
  
  imgChanged = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService,
    private activatedroute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fromTown: [null, [Validators.required]],
      toTown: [null, [Validators.required]],
      price: [null, [Validators.required]],
      departureTime: [null, [Validators.required]],
      arriveTime: [null, [Validators.required]],
      availableSeats: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    this.getAdById();
  }


  changeInputType(input: HTMLInputElement, type: string): void {
    input.type = type;
  }

  updateAd(): void {
    if (this.validateForm.invalid) {
      this.notification.error('ERROR', 'Please fill all required fields.', { nzDuration: 5000 });
      return;
    }

    const formData: FormData = new FormData();

    

    
    formData.append('fromTown', this.validateForm.get('fromTown')?.value);
    formData.append('toTown', this.validateForm.get('toTown')?.value);
    formData.append('departureTime', this.validateForm.get('departureTime')?.value);
    formData.append('arriveTime', this.validateForm.get('arriveTime')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('availableSeats', this.validateForm.get('availableSeats')?.value);

    this.companyService.updateAd(this.adId,formData).subscribe(
      res => {
        if (res && res.status === 'OK') {
          this.notification.success('SUCCESS', 'Ad Updated Successfully', { nzDuration: 5000 });
          this.router.navigateByUrl('/company/ads');
        } else {
          this.notification.error('ERROR', 'Ad Posting Failed', { nzDuration: 5000 });
          this.router.navigateByUrl('/company/ads');
        }
      },
      error => {
        this.notification.error('ERROR', 'An error occurred while posting the ad', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads'); 
      }
    );
  }



}
