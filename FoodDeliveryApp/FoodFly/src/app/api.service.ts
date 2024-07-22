// import { Injectable } from '@angular/core';

// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { UserProfile } from './Models/userprofile';



// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

  



// // frontend/src/app/api.service.ts



//   private BASE_URL = 'http://localhost:8000/api/users/';

//   constructor(private http: HttpClient) { }

//   getUserProfiles(): Observable<UserProfile[]> {
//     return this.http.get<UserProfile[]>(this.BASE_URL);
//   }

//   createUserProfile(profile: UserProfile): Observable<UserProfile> {
//     return this.http.post<UserProfile>(this.BASE_URL, profile);
//   }

//   getUserProfile(id: number): Observable<UserProfile> {
//     const url = `${this.BASE_URL}${id}/`;
//     return this.http.get<UserProfile>(url);
//   }

//   updateUserProfile(profile: UserProfile): Observable<UserProfile> {
//     const url = `${this.BASE_URL}${profile.id}/`;
//     return this.http.put<UserProfile>(url, profile);
//   }

//   deleteUserProfile(id: number): Observable<any> {
//     const url = `${this.BASE_URL}${id}/`;
//     return this.http.delete(url);
//   }
// }
