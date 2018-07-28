import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ImmovableService } from '../../../services/immovable.service';
import { _Immovable } from '../../../../classes/immovable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  id : string = "";
  lat: number = 33.957765;
  lng: number = -6.8752437;

  constructor(
    private dialog: MatDialog,
    private immovableService: ImmovableService
  ) { }

  openMap() : void {
    let mapRef = this.dialog.open(MapDialog,{
      width:'80%',
      data: { latLng: {lat: this.lat, lng : this.lng} }
    });

    mapRef.afterClosed().subscribe(result => {
      console.log(result)
      this.lat = result.lat;
      this.lng = result.lng;
    })
  }

  create() : void {
    console.log(this.id,this.lat,this.lng);
    this.immovableService.createImmovable(this.id,this.lat,this.lng).subscribe(() => {
      console.log("done")
    })
  }
  change() : void {
    console.log(this.id)
  }

}

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new.dialog.component.html',
  styleUrls: ['./new.dialog.component.scss']
})
export class MapDialog implements OnInit {

  @ViewChild('map') mapElement: any;
  map : google.maps.Map


  constructor(
    public dialogRef: MatDialogRef<MapDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // new map
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      disableDefaultUI: true,
      center: { lat: this.data.latLng.lat, lng: this.data.latLng.lng },
      zoom: 15
    });

    let marker = new google.maps.Marker({
      position: { lat: this.data.latLng.lat, lng: this.data.latLng.lng },
      map: this.map,
      title: 'New Immovable'
    })

    this.map.addListener('click', (e : google.maps.MouseEvent) => {
      marker.setPosition(e.latLng);
      this.data.latLng = { lat: e.latLng.lat(), lng: e.latLng.lng()};
    })
  }


}
