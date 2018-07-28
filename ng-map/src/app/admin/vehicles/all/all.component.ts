import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { VehicleService } from '../../../services/vehicle.service';
import { _Vehicle } from '../../../../classes/vehicle';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  items: _Vehicle[] = [];
  displayedColumns = ["_id", "type"];
  dataSource: MatTableDataSource<_Vehicle>;

  constructor(
    private vehicleService : VehicleService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.items = data;
      this.dataSource = new MatTableDataSource<_Vehicle>(this.items)
      this.dataSource.paginator = this.paginator;
    })
  }

}
