import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { } from 'rxjs/add/operator/map';
import { _ImmovableData } from '../../classes/immovable_data';
import { _Immovable } from '../../classes/immovable';


@Injectable()
export class ImmovableService {
  
  appUrl: string = 'http://localhost:3000/api'
  immovableDataUrl : string = `${this.appUrl}/immovable_data`;
  immovableUrl : string = `${this.appUrl}/immovables`

  constructor(
    private http: HttpClient
  ) { }

  getImmovables(minLat, minLng, maxLat, maxLng): Observable<_Immovable[]> {
    let params = new HttpParams();
    if (minLat) {
      params = params.set("minLat", minLat)
    }
    if (minLng) {
      params = params.set("minLng", minLng)
    }
    if (maxLat) {
      params = params.set("maxLat", maxLat)
    }
    if (maxLng) {
      params = params.set("maxLng", maxLng)
    }
    return this.http.get(this.immovableUrl, { params: params }).map(res => {
      console.log(res)
      return res["data"] as _Immovable[]
    })
  }

  getData(from, to, immovableId): Observable<_ImmovableData[]> {
    let params = this.setParams(from, to, immovableId)
    console.log(params.get('from'))
    return this.http.get(this.immovableDataUrl, { params: params }).map(res => {
      console.log(res)
      return res["data"] as _ImmovableData[]
    })
  }

  createImmovable(id:string,lat:number,lng:number) : Observable<any> {
    let immovable = {
      _id : id,
      lat : lat,
      lng : lng
    }
    console.log(immovable)
    return this.http.post(this.immovableUrl,{
      immovable : immovable
    })
  }

  private setParams(from, to, immovableId): HttpParams {
    let params = new HttpParams();
    if (from) {
      params = params.set("from", from.toString())
    }
    if (to) {
      params = params.set("to", to.toString())
    }
    if (immovableId) {
      params = params.set("immovableId", immovableId)
    }
    console.log(params.toString())
    return params;
  }

}
