import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhantomProvider } from 'src/app/interfaces';
import { Web3ProviderService } from 'src/app/services/web3provider/web3provider.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit, OnDestroy {
  provider$: Subscription;
  provider: PhantomProvider | null = null;
  constructor(private web3ProviderService: Web3ProviderService, private router: Router) {
    this.provider$ = this.web3ProviderService.provider.subscribe(provider => {
      this.provider = provider
    })
  }

  ngOnInit(): void {
    this.provider = this.web3ProviderService.getProvider()
  }

  ngOnDestroy(): void {
    this.provider$.unsubscribe()
  }

  connectWallet() {
    console.log("CONNECT WALLET CLICKED")
    this.provider?.connect({onlyIfTrusted: true})
      .then(provider => {
        console.log("isConnected: ", this.provider?.isConnected)
        this.router.navigate(["/"])
      })
  }
}
