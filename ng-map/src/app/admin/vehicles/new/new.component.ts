import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  id: string = "";
  type: string = "";
  constructor(
    private vehicleService : VehicleService
  ) { }

  ngOnInit() {
  }

  create() {
    this.vehicleService.createVehicle(this.id,this.type).subscribe((data) => {
      console.log("done")
    })
  }

}
