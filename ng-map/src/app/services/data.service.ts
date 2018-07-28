import { Injectable } from '@angular/core';
import { _VehicleData } from '../../classes/data';
import { _Position } from '../../classes/position';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';

import {} from 'rxjs/add/operator/map'
import { _ChartData } from '../../classes/chartData';

@Injectable()
export class DataService {

  api_url = 'http://localhost:3000';
  dataUrl = `${this.api_url}/api/data`;
  linesUrl = `${this.dataUrl}/lines`;
  chartsUrl = `${this.dataUrl}/charts`;
  markersUrl = `${this.dataUrl}/markers`;

  constructor(
    private http: HttpClient
  ) { }

  getData(from, to, vehicleId, minLat, minLng, maxLat, maxLng): Observable<_VehicleData[]>{
    let params = this.setParams(from,to,vehicleId)
    if (minLat) {
      params = params.set("minLat",minLat)
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
    console.log(params.get('from'))
    return this.http.get(this.dataUrl, {params: params}).map(res => {
      console.log(res)
      return res["data"] as _VehicleData[]
    })
  }

  getLines(from, to, vehicleId): Observable<_Position[]> {
    let params = this.setParams(from,to,vehicleId)
    return this.http.get(this.linesUrl, { params: params }).map(res => {
      console.log(res)
      return res["data"] as _Position[]
    })
  }

  getCharts(from, to, vehicleId): Observable< _ChartData[] > {
    let params = this.setParams(from, to, vehicleId)
    return this.http.get(this.chartsUrl, { params: params }).map(res => {
      console.log(res)
      return res["data"] as _ChartData[]
    })
  }

  getMarkers(from, to, vehicleId, minLat, minLng, maxLat, maxLng): Observable<_VehicleData[]> {
    let params = this.setParams(from, to, vehicleId)
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
    console.log(params.get('from'))
    return this.http.get(this.markersUrl, { params: params }).map(res => {
      console.log(res)
      return res["data"] as _VehicleData[]
    })
  }


  private setParams(from, to, vehicleId) : HttpParams {
    let params = new HttpParams();
    if (from) {
      params = params.set("from", from.toString())
    }
    if (to) {
      params = params.set("to", to.toString())
    }
    if (vehicleId) {
      params = params.set("vehicleId", vehicleId)
    }
    console.log(params.toString())
    return params;
  }


}
