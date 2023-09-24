import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PhantomProvider } from 'src/app/interfaces';
import { Web3ProviderService } from 'src/app/services/web3provider/web3provider.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  const web3ProviderService = inject(Web3ProviderService)
  const router = inject(Router)
  const provider = web3ProviderService.provider
  // Use the observable to check authentication status
  return web3ProviderService.provider.pipe(
    map(provider => {
      console.log("GUARD PROVIDER: ", provider)
      // Assuming 'isConnected' represents authentication status
      if (provider?.isConnected) {
        // User is authenticated, allow navigation
        return true;
      } else {
        // User is not authenticated, deny navigation
        router.navigate(['connect']); // Redirect to the login page or another appropriate route
        return false;
      }
    })
  );
}