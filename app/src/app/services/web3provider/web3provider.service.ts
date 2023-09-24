import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PublicKey, clusterApiUrl, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PhantomProvider } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Web3ProviderService {
  private _provider = new BehaviorSubject<PhantomProvider | null>(null);
  readonly provider: Observable<PhantomProvider | null> = this._provider.asObservable()
  readonly connection: Connection = new Connection(clusterApiUrl(environment.production ? "devnet" : "devnet"), "confirmed");
  constructor() {}

  detectProvider = (): void => { 
    const appWindow: any = window
    if ('phantom' in appWindow) {
      console.log("PHANTOM IS PRESENT");
      const provider = appWindow?.phantom?.solana;
      if (provider?.isPhantom) {
        console.log("PROVIDER IS PHANTOM")
        console.log("PROVIDER: ", provider);
        this._provider.next(provider);
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  }

  getProvider = (): PhantomProvider | null => this._provider.getValue()

  getBalance = async (publicKey: PublicKey) => await this.connection.getBalance(publicKey, "confirmed") / LAMPORTS_PER_SOL

}
