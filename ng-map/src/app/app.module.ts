import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase and firebase conf import
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { firebase } from '../environments/firebase'

// Angular Material Components :
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material';
import { Md2DatepickerModule, MdNativeDateModule } from 'md2';

// Components
import { AppComponent } from './app.component';
import { RtmapComponent } from './rtmap/rtmap.component';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { ImmovablesComponent } from './admin/immovables/immovables.component';
import { AllComponent as VehiclesAllComponent } from './admin/vehicles/all/all.component';
import { AllComponent as ImmovablesAllComponent } from './admin/immovables/all/all.component';
import { NewComponent as VehiclesNewComponent } from './admin/vehicles/new/new.component';
import { NewComponent as ImmovablesNewComponent, MapDialog } from './admin/immovables/new/new.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Http Modules
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Services
import { DataService } from './services/data.service'
import { ImmovableService } from './services/immovable.service';
import { VehicleService } from './services/vehicle.service';

import { IterablePipe } from '../classes/iterablePipe';

@NgModule({
  declarations: [
    AppComponent,
    RtmapComponent,
    HistoryComponent,
    AdminComponent,
    VehiclesComponent,
    ImmovablesComponent,
    VehiclesAllComponent,
    ImmovablesAllComponent,
    VehiclesNewComponent,
    ImmovablesNewComponent,
    IterablePipe,
    MapDialog,
  ],
  entryComponents: [
    MapDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    Md2DatepickerModule, 
    MdNativeDateModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    DataService,
    ImmovableService,
    VehicleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
