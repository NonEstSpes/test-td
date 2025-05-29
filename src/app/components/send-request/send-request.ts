import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-send-request',
  imports: [],
  templateUrl: './send-request.html',
  styleUrl: './send-request.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendRequest {}
