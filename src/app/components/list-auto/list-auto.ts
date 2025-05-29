import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemAuto } from './item-auto/item-auto';

@Component({
  selector: 'app-list-auto',
  imports: [ItemAuto],
  templateUrl: './list-auto.html',
  styleUrl: './list-auto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAuto {}
