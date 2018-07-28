import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Response } from '@angular/http';
import { _VehicleData } from '../../classes/data';
import { PlotManager } from '../../classes/plotManager'

// Google maps typing and const
import { mapStyle } from '../../environments/mapStyle'
import { } from '@types/googlemaps'
import { } from '@types/chart.js'
import { _Vehicle } from '../../classes/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  @ViewChild('chart1') chart1Element: any;
  @ViewChild('chart2') chart2Element: any;

  from: Date = new Date(1524061158000);
  to: Date = new Date(1524061398000);
  vehicleId : string = '';
  map: google.maps.Map;
  plotManager: PlotManager;
  chart: Chart;
  vehicles: _Vehicle[] = null;


  constructor(
    private dataService: DataService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    // new map
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      disableDefaultUI: true,
      center: { lat: 33.9577659, lng: -6.8752437 },
      zoom: 15,
      styles: mapStyle,
      // gestureHandling: "none"
    });

    this.plotManager = new PlotManager(this.map,this.chart1Element.nativeElement,this.chart2Element.nativeElement);
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data
    })
  }

  get():void {
    console.log(this.from.valueOf())
    // Polylines
    this.dataService.getLines(this.from.valueOf(),this.to.valueOf(),this.vehicleId).subscribe(data => {
      this.plotManager.plotLines(data);
    })
    // Charts
    this.dataService.getCharts(this.from.valueOf(), this.to.valueOf(), this.vehicleId).subscribe(data => {
      this.plotManager.plotCharts(data);
    })
    // Markers
    this.map.addListener('bounds_changed', () => {
      this.plotManager.cleanMarkers();
      this.dataService.getMarkers(this.from.valueOf(), 
                               this.to.valueOf(),
                               this.vehicleId,
                               this.map.getBounds().getSouthWest().lat(),
                               this.map.getBounds().getSouthWest().lng(),
                               this.map.getBounds().getNorthEast().lat(),
                               this.map.getBounds().getNorthEast().lng()
                              )
      .subscribe(data => {
        this.plotManager.plotMarkers(data)
      })
    })
  }

  change():void {
    console.log(this.from.valueOf())
  }

}
