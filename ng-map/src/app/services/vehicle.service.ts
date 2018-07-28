import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _Vehicle } from '../../classes/vehicle';

@Injectable()
export class VehicleService {


  appUrl: string = 'http://localhost:3000/api'
  vehicleUrl: string = `${this.appUrl}/vehicles`

  constructor(
    private http: HttpClient
  ) { }

  getVehicles(): Observable<_Vehicle[]> {
    return this.http.get(this.vehicleUrl).map(res => {
      console.log(res)
      return res["data"] as _Vehicle[]
    })
  }

  createVehicle(_id:string,type:string): Observable<any> {
    let vehicle = {
      _id,
      type
    }
    return this.http.post(this.vehicleUrl, {
      vehicle 
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
