import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FormField } from "src/forum/models/FromField.class";
import { PostRequestBodyDto } from "src/forum/models/post/post-request-body-dto";
import { ThreadRequestBodyDto } from "src/forum/models/thread/thread-request-body-dto";
import { ForumPageComponent } from "src/forum/pages/forum-page/forum-page.component";
import { ThreadViewPageComponent } from "src/forum/pages/thread/thread-view-page/thread-view-page.component";
import { ForumService } from "src/forum/services/forum.service";
import { HelperService } from "src/forum/services/helper.service";


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html'
})
export class CreateThreadComponent implements OnInit {

  public readonly title: string = 'title';
  public readonly text: string = 'text';

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    public helperService: HelperService,
    private forumService: ForumService
  ) { }
  public threadForm: FormGroup;
  ngOnInit(): void {
    this.threadForm = this.buildForm();
  }

  public buildForm(): FormGroup  {
    return this.buildSimpleFormWithValidation([
        new FormField(this.title, this.formBuilder.control(null, [Validators.required, Validators.maxLength(200)])),
        new FormField(this.text, this.formBuilder.control(null, Validators.required)),

      ]
    );
  }

  protected getFormValues<T>(target: T): T {
    // Load the form data into the object
    return Object.assign(target, this.threadForm.value);
  }

  private buildSimpleFormWithValidation(fields: FormField[]): FormGroup {
    const group = this.formBuilder.group({});
    for (const field of fields) {
      group.addControl(field.id, field.formControl);
    }
    return group;
  }

  public onClickSave(): void {
    let data = this.getFormValues(new ThreadForm());
    let createThreadData = new ThreadRequestBodyDto(data.title);
    this.forumService.createThread(createThreadData).toPromise().then(threadRes => {
      let createPostData = new PostRequestBodyDto(data.title, data.text, threadRes.id);
      this.forumService.createPost(createPostData).toPromise().then(res => {
        this.router.navigate([`/${ThreadViewPageComponent.ROUTE.replace(':id', threadRes.id)}`]);
      })
    })
  }

  public saveCallback = () => this.onClickSave();
  public cancelCallback = () => this.cancel();

  protected cancel(): void {
    this.router.navigate([ForumPageComponent.ROUTE]);
  }
}

class ThreadForm {
  public title: string = undefined;
  public text: string = undefined;
}
