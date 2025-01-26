import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';


const BASIC_URL = "http://localhost:8000/bus-booking-service/";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllAds(): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/ads`, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  searchAdByName(fromTown:any,toTown:any): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/search/${fromTown}-${toTown}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  

  bookService(bookDTO:any): Observable<any> { 
    
    return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAdDetailsById(adId:any): Observable<any> {
    return this.http.get(BASIC_URL + `api/client/ad/${adId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyBookings(): Observable<any> { 
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/client/my-bookings/${userId}`,  {
      headers: this.createAuthorizationHeader()
    });
  }

  giveReview(reviewDTO:any): Observable<any> { 
    
    return this.http.post(BASIC_URL + `api/client/review`, reviewDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

}
