import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { TruncatePipe } from 'src/app/modules/home/pipes/truncate/truncate.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        HomeComponent,
        UserWalletComponent,
        TruncatePipe,
        MenuComponent,
        PostItemComponent,
        PostDetailComponent,
        PostListComponent,
        PostFormComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
