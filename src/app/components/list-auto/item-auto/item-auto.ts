import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiBadge } from '@taiga-ui/kit';
import {DataAuto} from '../../../types/auto';

@Component({
  selector: 'app-item-auto',
  imports: [TuiAppearance, TuiCardMedium, TuiBadge, TuiTitle],
  templateUrl: './item-auto.html',
  styleUrl: './item-auto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemAuto {
  auto$$: InputSignal<DataAuto> = input.required({
    alias: 'auto',
  })
}
