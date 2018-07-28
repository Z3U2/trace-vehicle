import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ImmovableService } from '../../../services/immovable.service';
import { _Immovable } from '../../../../classes/immovable';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  items: _Immovable[] = null;
  displayedColumns = ["_id","lat","lng"];
  dataSource : MatTableDataSource<_Immovable>;

  constructor(
    private immovableService: ImmovableService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.immovableService.getImmovables(0, 0, 0, 0).subscribe( data => {
      this.items = data;
      this.dataSource = new MatTableDataSource<_Immovable>(this.items)
      this.dataSource.paginator = this.paginator;

    })
  }

}
