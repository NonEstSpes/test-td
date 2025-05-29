import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ENV, ENV_TOKEN } from '../../environment/environment';
import { RequestData } from '../../types/request';
import { DataAuto } from '../../types/auto';

@Injectable({
  providedIn: 'root',
})
export class Auto {
  public listAuto: Observable<DataAuto[]> = new Observable<DataAuto[]>();
  private http: HttpClient = inject(HttpClient);
  private env: ENV = inject(ENV_TOKEN);

  public getListAuto(): void {
    this.listAuto = this.http
      .get<RequestData<DataAuto[]>>(`${this.env.restUrl}/list_auto`)
      .pipe(map((val) => val.data));
  }
}
