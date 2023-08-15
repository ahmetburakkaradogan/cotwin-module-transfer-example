import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PostDto } from "src/forum/models/post/post-dto";
import { PostRequestBodyDto } from "src/forum/models/post/post-request-body-dto";
import { ForumService } from "src/forum/services/forum.service";
import { HelperService } from "src/forum/services/helper.service";
import { CreatePostComponent } from "../create-post/create-post.component";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html'
})
export class EditPostComponent extends CreatePostComponent implements OnInit {


  @Input()
  post: PostDto;
  @Input()
  fullText: string;

  @Output()
  public onCancel = new EventEmitter<void>();

  constructor(translateService: TranslateService, formBuilder: FormBuilder, router: Router, helperService: HelperService, forumService: ForumService) {
    super(translateService, formBuilder, router, helperService, forumService);
  }

  public onClickSave() {
    let updatePostData = this.getFormValues(new PostRequestBodyDto());
    updatePostData.threadId = this.threadId;
    this.forumService.updatePost(this.post.id, updatePostData).toPromise().then(res => {
      this.onSave.emit(res);
    })
  }

  public cancel(): void{
    this.onCancel.emit();
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.postForm.get(this.title).patchValue(this.post.title);
    this.postForm.get(this.body).patchValue(this.fullText);
  }

}
