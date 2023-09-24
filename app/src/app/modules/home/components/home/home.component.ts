import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhantomProvider, Post, PostsProgram, ProgramResponse } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post/post.service';
import { Web3ProviderService } from 'src/app/services/web3provider/web3provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  provider$: Subscription
  posts$: Subscription
  posts: ProgramResponse<Post>[] = []
  provider: PhantomProvider | null = null
  postProgram: PostsProgram = null

  constructor(private web3ProviderService: Web3ProviderService, private postService: PostService, 
  private router: Router) {
    this.provider$ = this.web3ProviderService.provider.subscribe(provider => {
      this.provider = provider
    })
    this.posts$ = this.postService.posts$.subscribe(post => {
      this.posts = post
    })
  }

  ngOnDestroy(): void {
    this.provider$.unsubscribe()
  }
}
