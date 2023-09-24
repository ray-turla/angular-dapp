import { Injectable } from '@angular/core';
import { Post, ProgramResponse } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }

  getExplorer = (address: string) => {
    const cluster = environment.production ? "?cluster=devnet" : "?cluster=devnet"
    return environment.explorer_url + `/${address}` + cluster
  }

  getDatetime = () => {
    const dt = new Date();
    const dateString =  dt.toDateString() + " " + dt.toTimeString().split(" ")[0]
    return dateString
  }
}
