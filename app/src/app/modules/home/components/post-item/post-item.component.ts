import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post, ProgramResponse } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post!: ProgramResponse<Post>

  constructor(private router: Router, private postService: PostService) {}

  getDetail(post: ProgramResponse<Post>) {
    console.log("CLICKED: ", post)
    this.postService.selectedPost(post)
    this.router.navigate(["post", post.publicKey?.toBase58()])
  }
}
