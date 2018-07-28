import { Component } from '@angular/core';
import { ImmovableService } from '../../services/immovable.service';
import { _Immovable } from '../../../classes/immovable';

@Component({
  selector: 'app-immovables',
  templateUrl: './immovables.component.html',
  styleUrls: ['./immovables.component.scss']
})
export class ImmovablesComponent {

  items: _Immovable[] = null;

  constructor(
    private immovableService: ImmovableService
  ) { }

}
