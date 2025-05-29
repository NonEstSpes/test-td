import {InjectionToken} from '@angular/core';

export interface ENV {
  restUrl: string;
}

const env: ENV = {
  restUrl: window.location.origin + '/api',
}

export const ENV_TOKEN: InjectionToken<ENV> = new InjectionToken<ENV>('env', {
  providedIn: 'root',
  factory: () => env
})
