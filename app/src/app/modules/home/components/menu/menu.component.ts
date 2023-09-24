import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faLinkSlash, faHome } from '@fortawesome/free-solid-svg-icons';
import { PhantomProvider } from 'src/app/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() provider!: PhantomProvider | null
  icon = { faCoffee, faLinkSlash, faHome }

  constructor(private router: Router) {}

  disconnect = async () => {
    this.provider?.disconnect().then(value => {
      console.log("Disconnect Wallet")
      console.log("isConnected: ", this.provider?.isConnected)
      this.router.navigate(["connect"], {skipLocationChange: true})
    }).catch(e => console.log(e))
  }
}
