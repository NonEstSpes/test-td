import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ItemAuto } from './item-auto/item-auto';
import { Auto } from '../../core/services/auto';
import { AsyncPipe } from '@angular/common';
import { TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { tuiDialog, TuiDialogService } from '@taiga-ui/core';
import { CreditCalculator } from '../credit-calculator/credit-calculator';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-auto',
  imports: [ItemAuto, AsyncPipe, TuiCarousel, TuiPagination],
  templateUrl: './list-auto.html',
  styleUrl: './list-auto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAuto implements OnInit, OnDestroy {
  protected autoService: Auto = inject(Auto);

  protected readonly dialog = tuiDialog(CreditCalculator, {
    dismissible: true,
    label: 'Кредитный калькулятор',
  });

  private destroy$: Subject<void> = new Subject<void>();

  protected index: number = 0;
  protected readonly itemsCount: number = 2;

  ngOnInit() {
    this.autoService.getListAuto();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  protected onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  protected showCalculator(price: number): void {
    this.dialog(price).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
