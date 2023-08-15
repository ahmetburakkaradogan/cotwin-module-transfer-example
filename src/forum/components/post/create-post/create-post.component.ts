import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FormField } from "src/forum/models/FromField.class";
import { PostDto } from "src/forum/models/post/post-dto";
import { PostRequestBodyDto } from "src/forum/models/post/post-request-body-dto";
import { ForumPageComponent } from "src/forum/pages/forum-page/forum-page.component";
import { ForumService } from "src/forum/services/forum.service";
import { HelperService } from "src/forum/services/helper.service";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: []
})
export class CreatePostComponent implements OnInit {

  public readonly title: string = 'title';
  public readonly body: string = 'body';

  @Input()
  threadId: string;

  @Output()
  public onSave = new EventEmitter<PostDto>();

  @Input()
  newPostIndex: number;

  constructor(
    public translateService: TranslateService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    public helperService: HelperService,
    protected forumService: ForumService
  ) {}
  public postForm: FormGroup;
  ngOnInit(): void {
    this.postForm = this.buildForm();
  }

  public buildForm(): FormGroup  {
    return this.buildSimpleFormWithValidation([
        new FormField(this.title, this.formBuilder.control(null)),
        new FormField(this.body, this.formBuilder.control(null, Validators.required)),

      ]
    );
  }

  public getFormValues<T>(target: T): T {
    // Load the form data into the object
    return Object.assign(target, this.postForm.value);
  }

  private buildSimpleFormWithValidation(fields: FormField[]): FormGroup {
    const group = this.formBuilder.group({});
    for (const field of fields) {
      group.addControl(field.id, field.formControl);
    }
    return group;
  }

  public onClickSave(): void {
    let createPostData = this.getFormValues(new PostRequestBodyDto());
    createPostData.threadId = this.threadId;
    if(createPostData.title == null || createPostData.title == ''){
      createPostData.title = this.translateService.instant('Thread.post.defaultTitle') + ' ' + this.newPostIndex;
    }
    this.forumService.createPost(createPostData).toPromise().then(res => {
      this.onSave.emit(res);
      this.postForm.reset();
    })
  }

  public saveCallback = () => this.onClickSave();
  public cancelCallback = () => this.cancel();

  protected cancel(): void {
    this.router.navigate([ForumPageComponent.ROUTE]);
  }

  public setFormBody(value: string, title: string){
    this.postForm.patchValue({
      body: value.replace('<quote', '[QUOTE').replace('</quote>','[/QUOTE]'),
      title: this.translateService.instant('Thread.post.replyPrefix') + title
    })
  }
}

