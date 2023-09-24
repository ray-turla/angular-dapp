import { Location } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post, ProgramResponse } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post/post.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  id = "";
  postForm: FormGroup;
  post: ProgramResponse<Post> | null = null;
  POST_CONTENT_LENGTH = 1000
  formOpts: AbstractControlOptions = {
    updateOn: 'change',
    validators: [Validators.required]
  }
  textCount = 0;
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private location: Location, private utils: UtilityService) {
    this.id = this.route.snapshot.paramMap.get('id') || ""

    if (this.id) {
      this.post = this.postService.getSelectedPost() 
      this.postForm = new FormGroup({
        title: new FormControl(this.post?.account.title, this.formOpts),
        content: new FormControl(this.post?.account.content, this.formOpts),
      });
    } else {
      this.postForm = new FormGroup({
        title: new FormControl('', this.formOpts),
        content: new FormControl('', this.formOpts),
      });
    }

    this.postForm?.get('title')?.valueChanges.subscribe(value => {
      if (this.post) {
        if (this.post?.account.title === value) {
          this.postForm?.get('title')?.setErrors({sameUpdateFieldValue: true})
        }
      }
    });

    this.postForm?.get('content')?.valueChanges.subscribe(value => {
      this.textCount = value.length;
      if (this.textCount >= this.POST_CONTENT_LENGTH) {
        // Truncate text if character limit is reached
        this.postForm?.get('content')?.setValue(value.substring(0, this.POST_CONTENT_LENGTH), { emitEvent: false });
      }

      if (this.post) {
        if (this.post?.account.content === value) {
          this.postForm?.get('content')?.setErrors({sameUpdateFieldValue: true})
        }
      }
    });
  }

  ngOnInit(): void {
    // this.postForm.value()
  }

  controlInvalid(name: string, error: string) {
    return this.postForm.controls[name].dirty && this.postForm.controls[name].touched && this.postForm.controls[name].errors?.[error]
  }

  handleClear = () => {
    this.postForm?.setValue({
      title: "",
      content: ""
    })
  }

  handleCancel = () => {
    this.location?.back()
    this.postForm.value
  }

  handleSubmit = async () => {
    const { title, content } = this.postForm.value
    const createdAt = this.post ? null : this.utils.getDatetime();
    const updatedAt = this.post ? this.utils.getDatetime() : null;
    const postData = { title, content, createdAt, updatedAt };
    if (this.post) {
      await this.postService.updatePost(postData, this.post)
      this.router.navigate(["post/update", this.post.publicKey  ])
    } else {
      await this.postService.createPost(postData)
      this.router.navigate([""])
    }
  }

}
