import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { RtmapComponent } from './rtmap/rtmap.component'
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { ImmovablesComponent } from './admin/immovables/immovables.component';
import { AllComponent as ImmovablesAllComponent } from './admin/immovables/all/all.component';
import { NewComponent as ImmovablesNewComponent } from './admin/immovables/new/new.component';
import { AllComponent as VehiclesAllComponent } from './admin/vehicles/all/all.component'
import { NewComponent as VehiclesNewComponent } from './admin/vehicles/new/new.component'

const routes : Routes = [
  { path: '', redirectTo: '/rtmap', pathMatch: 'full' },
  { path: 'rtmap', component: RtmapComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'admin', component: AdminComponent, children: [
    {path : 'vehicles', component: VehiclesComponent, children: [
      { path: '', redirectTo: 'all', pathMatch: 'full'},
      { path: 'all', component: VehiclesAllComponent },
      { path: 'new', component: VehiclesNewComponent }
    ]},
    {path: 'immovables', component: ImmovablesComponent,children:[
      {path:'', redirectTo:'all',pathMatch:'full'},
      { path: 'all', component: ImmovablesAllComponent},
      { path: 'new', component: ImmovablesNewComponent}
    ]}
  ] }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
