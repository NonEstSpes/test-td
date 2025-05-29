import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TuiAppearance, TuiTitle} from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiBadge } from '@taiga-ui/kit';

@Component({
  selector: 'app-item-auto',
  imports: [TuiAppearance, TuiCardMedium, TuiBadge, TuiTitle],
  templateUrl: './item-auto.html',
  styleUrl: './item-auto.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemAuto {}
