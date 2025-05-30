import {
  ChangeDetectionStrategy,
  Component, inject,
  OnDestroy,
  OnInit,
  signal, TemplateRef,
  WritableSignal,
} from '@angular/core';
import {TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import { TuiInputSlider, TuiSlider } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith, Subject, takeUntil } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import {YearsDeclensionPipe} from '../../core/pipes/year-declension-pipe';

@Component({
  selector: 'app-credit-calculator',
  imports: [
    TuiSlider,
    FormsModule,
    TuiInputSlider,
    TuiTextfield,
    ReactiveFormsModule,
    TuiTitle,
    DecimalPipe,
    YearsDeclensionPipe,
    TuiButton,
  ],
  templateUrl: './credit-calculator.html',
  styleUrl: './credit-calculator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCalculator implements OnInit, OnDestroy {
  public readonly context = injectContext<TuiDialogContext<number, number>>();
  private readonly dialogs = inject(TuiDialogService);

  min: number = this.context.data * 0.1;
  max: number = this.context.data * 0.9;
  step: number = this.context.data * 0.05;

  protected interestRate$$: WritableSignal<number> = signal(0);

  protected creditForm = new FormGroup({
    initialPayment: new FormControl(this.min, [
      Validators.required,
      Validators.min(this.min),
    ]),
    monthlyFee: new FormControl(5000, [
      Validators.required,
      Validators.min(1000),
    ]),
    creditTerm: new FormControl(60, [Validators.required, Validators.min(12)]),
  });

  private destroy$: Subject<void> = new Subject<void>();
  private isUpdating = false;

  ngOnInit() {
    const creditTermControl = this.creditForm.controls.creditTerm;
    const monthlyFeeControl = this.creditForm.controls.monthlyFee;

    creditTermControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((creditTermValue) => {
        if (this.isUpdating) return;

        this.isUpdating = true;
        const newMonthlyFee = Math.max(1000, (creditTermValue || 0) / 0.012);
        monthlyFeeControl.setValue(newMonthlyFee, { emitEvent: false });
        this.isUpdating = false;
      });

    monthlyFeeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((monthlyFeeValue) => {
        if (this.isUpdating) return;

        this.isUpdating = true;
        const newCreditTerm = Math.max(12, (monthlyFeeValue || 0) * 0.012);
        creditTermControl.setValue(newCreditTerm, { emitEvent: false });
        this.isUpdating = false;
      });

    this.creditForm.valueChanges
      .pipe(startWith(this.creditForm.value), takeUntil(this.destroy$))
      .subscribe((val) => {
        if (!val.initialPayment || !val.creditTerm || !val.monthlyFee) return;
        this.calculateInterestRate(
          val.initialPayment,
          val.monthlyFee,
          val.creditTerm
        );
      });
  }

  private calculateInterestRate(x: number, z: number, a: number): void {
    const y = 0.000007 * (x / a) + 0.1 * (z / x) + 0.1;

    this.interestRate$$.set(Math.max(0.05, y));
  }

  protected showNotification(content: TemplateRef<TuiDialogContext>): void {
    this.dialogs.open(content, {dismissible: true}).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
