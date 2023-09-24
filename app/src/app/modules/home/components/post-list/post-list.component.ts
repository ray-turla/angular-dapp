import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PhantomProvider, Post, PostsProgram, ProgramResponse } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post/post.service';
import { Web3ProviderService } from 'src/app/services/web3provider/web3provider.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  // provider$: Subscription
  posts$: Subscription
  posts: ProgramResponse<Post>[] = []
  provider: PhantomProvider | null = null
  postProgram: PostsProgram = null

  constructor(private web3ProviderService: Web3ProviderService, private postService: PostService, 
  private router: Router) {
    this.posts$ = this.postService.posts$.subscribe(post => {
      this.posts = post.sort()
    })
  }

  async ngOnInit(): Promise<void> {
    console.log("INIT POST LIST")
    if (this.posts.length > 0) {
      console.log("POST FROM OBSERVABLE IS NOT EMPTY")
    } else {
      await this.postService.getPosts()
    }
    console.log(this.posts)
  }

  ngOnDestroy(): void {
    this.posts$.unsubscribe()
  }

  handleCreatePost = () => {
    console.log("CREATE POST CLICKED")
    this.router.navigate(["post/create"])
  }
}
