import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { ItemAuto } from './item-auto/item-auto';
import {Auto} from '../../core/services/auto';
import {AsyncPipe} from '@angular/common';
import {TuiCarousel, TuiPagination} from '@taiga-ui/kit';

@Component({
  selector: 'app-list-auto',
  imports: [ItemAuto, AsyncPipe, TuiCarousel, TuiPagination],
  templateUrl: './list-auto.html',
  styleUrl: './list-auto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAuto implements OnInit {
  protected autoService = inject(Auto)

  protected index = 0;

  protected readonly itemsCount = 2;

  ngOnInit() {
    this.autoService.getListAuto()
  }

  protected get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  protected onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }
}
