import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-item-auto',
  imports: [],
  templateUrl: './item-auto.html',
  styleUrl: './item-auto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemAuto {

}
