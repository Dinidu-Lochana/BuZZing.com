// create-ad.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  
  validateForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService 
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
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  changeInputType(input: HTMLInputElement, type: string): void {
    input.type = type;
  }

  postAd(): void {
    if (this.validateForm.invalid) {
      this.notification.error('ERROR', 'Please fill all required fields.', { nzDuration: 5000 });
      return;
    }

    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile); 
    }
    formData.append('fromTown', this.validateForm.get('fromTown')?.value);
    formData.append('toTown', this.validateForm.get('toTown')?.value);
    formData.append('departureTime', this.validateForm.get('departureTime')?.value);
    formData.append('arriveTime', this.validateForm.get('arriveTime')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('availableSeats', this.validateForm.get('availableSeats')?.value);

    this.companyService.postAd(formData).subscribe(
      res => {
        if (res && res.status === 'OK') {
          this.notification.success('SUCCESS', 'Ad Posted Successfully', { nzDuration: 5000 });
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
