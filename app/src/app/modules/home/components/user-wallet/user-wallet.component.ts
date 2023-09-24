import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicKey } from '@solana/web3.js';
import { PhantomProvider } from 'src/app/interfaces';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Web3ProviderService } from 'src/app/services/web3provider/web3provider.service';
// import  { Connection } from '@solana/web3.js'
@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {
  @Input() provider!: PhantomProvider | null;
  balance: number = 0
  constructor(public utils: UtilityService, private web3ProviderService: Web3ProviderService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    console.log("USER WALLET COMPONENT")
    this.balance = await this.web3ProviderService.getBalance(this.provider?.publicKey as PublicKey)
    // const connection = new web
  }
}
