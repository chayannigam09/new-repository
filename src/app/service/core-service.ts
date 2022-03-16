import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor( private http : HttpClient) { }

  get(url: string){
    return this.http.get<any>(url);
  }
  post(url: string,obj: any){
    return this.http.post(url,obj);
  }

}
