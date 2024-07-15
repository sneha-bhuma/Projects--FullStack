import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  url: string = "http://127.0.0.1:8000/reviewvs/"

  constructor() { }

  getReview(){
    return fetch(this.url).then((res)=> res.json());
  }
  addReview(review:any){
  return fetch(this.url,{
    method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(review)
  });
}
deleteReview(id: number) {
  return fetch(this.url+id+"/", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
}
