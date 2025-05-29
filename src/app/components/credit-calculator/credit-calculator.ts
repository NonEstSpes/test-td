import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  TemplateRef,
} from '@angular/core';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiInputSlider, TuiSlider } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-credit-calculator',
  imports: [
    TuiSlider,
    FormsModule,
    TuiInputSlider,
    TuiTextfield,
    ReactiveFormsModule,
  ],
  templateUrl: './credit-calculator.html',
  styleUrl: './credit-calculator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCalculator {
  public readonly context = injectContext<TuiDialogContext<number, number>>();
  min = this.context.data * 0.1;
  max = this.context.data * 0.9;
  step = this.context.data * 0.05;

  protected creditForm = new FormGroup({
    initialPayment: new FormControl(this.min),
  });
}
