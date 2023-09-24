import { Component, OnDestroy, OnInit } from '@angular/core';
import { Web3ProviderService } from './services/web3provider/web3provider.service';
import { PhantomProvider } from './interfaces';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  provider$: Subscription;
  provider: PhantomProvider | null = null;

  constructor(private web3ProviderService: Web3ProviderService, private router: Router) {
    this.provider$ = this.web3ProviderService.provider.subscribe(provider => {
      this.provider = provider
    })
  }

  ngOnInit(): void {
    console.log("app init")
    this.web3ProviderService.detectProvider()
    
    
    this.provider?.connect({onlyIfTrusted: true}).then(provider => {
      console.log("CONNECT RESPONSE: ", provider)
      this.router.navigate([""])
    })
  }

  printpath(parent: string, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? `${parent}/${route.path}` : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
  ngOnDestroy(): void {
    this.provider$.unsubscribe()
  }
}