import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhantomProvider, Post, ProgramResponse } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post/post.service';
import { faCircleArrowLeft, faTrashCan, faPenToSquare, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Web3ProviderService } from 'src/app/services/web3provider/web3provider.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  provider: PhantomProvider | null = null
  id: string = "";
  post: ProgramResponse<Post> | null
  icon = { faCircleArrowLeft, faTrashCan, faPenToSquare, faReceipt }
  constructor(private route: ActivatedRoute, private postService: PostService, private web3ProviderService: Web3ProviderService, private router: Router, public utils: UtilityService) {
    this.post = this.postService.getSelectedPost()
    this.provider = this.web3ProviderService.getProvider()
  }

  ngOnInit(): void {
    console.log(this.post)
    this.id = this.route.snapshot.paramMap.get('id') || ""
  }

  async handleDelete(post: ProgramResponse<Post> | null) {
    console.log("CLICK DELETE POST")
    await this.postService.deletePost(post)
    this.router.navigate([""])
  }

  async handleUpdate(post: ProgramResponse<Post> | null) {
    this.postService.selectedPost(post as ProgramResponse<Post>)
    this.router.navigate(["post/update", post?.publicKey?.toBase58()])
  }
}
