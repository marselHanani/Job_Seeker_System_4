import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient:HttpClient) { }

  postJop(data:any){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.post('http://127.0.0.1:8000/api/jobs', data, { headers });
  }
}
