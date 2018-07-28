import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// FireBase import
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { FirebaseDatabase } from '@firebase/database-types';

// Classes import
import { Time } from '../classes/time';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  
  timeRef: AngularFireObject<Time>;
  time : string;
  


  constructor(db: AngularFireDatabase) {
    this.timeRef = db.object('current-time');
  }

  ngOnInit() {

    this.timeRef.valueChanges().subscribe( val => {
      this.time = val.display;
    } )

  }
}

