import { registerLocaleData } from "@angular/common";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService } from "primeng/api";
import { PostDto, ReplyPost } from "src/forum/models/post/post-dto";
import { VoteType } from "src/forum/models/vote/vote-dto";
import { VoteRequestBodyDto } from "src/forum/models/vote/vote-request-body-dto";
import { CustomMessageService } from "src/forum/services/custom-message.service";
import { ForumService } from "src/forum/services/forum.service";
import { ImageService } from "src/forum/services/image.service";



@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  providers: [ConfirmationService]
})
export class ViewPostComponent implements OnInit {

  @Input()
  post: PostDto;

  @Input()
  threadId: string;

  @Input()
  postIndex: number;

  fullText: string;

  languages: string = 'en';
  role: string = '';
  userRoute: string;
  userProfileImageSource: string;

  public ownPost: boolean;
  public editView: boolean = false;

  @Output()
  public onReplyPost = new EventEmitter<ReplyPost>();

  @Output()
  public onDelete = new EventEmitter<PostDto>();

  quoteInfo: ReplyPost;

  constructor(public imageService: ImageService,
              public translateService: TranslateService,
              private forumService: ForumService,
              private messageService: CustomMessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.checkQuote();
    this.languages = this.convertLanguageKeys(this.post.user.langKey);
    this.role = this.convertRoleKeys(this.post.user.authorities);
    this.userProfileImageSource = this.imageService.getUserImageUrl(this.post.user.imageUrl)
    this.userRoute = '/';
    this.ownPost = false;
  }

  public onReply(){
    let replyPost = new ReplyPost();
    replyPost.postId = this.post.id;
    replyPost.postBody = this.post.body;
    replyPost.postTitle = this.post.title;
    replyPost.postCreatedTime = this.post.createdDate;
    replyPost.postIndex = this.postIndex;
    replyPost.userId = this.post.user.id;
    replyPost.userLogin = this.post.user.login;
    replyPost.threadId = this.threadId;
    this.onReplyPost.emit(replyPost);
  }

  private checkQuote(): void{
    let body = this.post.body;
    this.fullText = body;
    body = body.replace('[QUOTE', '<quote').replace('[/QUOTE]','</quote>')
    let tempEl = document.createElement('div');
    tempEl.innerHTML = body;
    if(tempEl.querySelector('quote')){
      let quoteAttributes = tempEl.querySelector('quote').attributes;
      let quoteInfo = new ReplyPost();
      quoteInfo.postId = quoteAttributes.getNamedItem('postId').value
      quoteInfo.postBody = quoteAttributes.getNamedItem('postBody').value;
      quoteInfo.postTitle = quoteAttributes.getNamedItem('postTitle').value;
      quoteInfo.postCreatedTime = quoteAttributes.getNamedItem('postCreatedTime').value;
      quoteInfo.postIndex = Number(quoteAttributes.getNamedItem('postIndex').value);
      quoteInfo.userId = quoteAttributes.getNamedItem('userId').value;
      quoteInfo.userLogin = quoteAttributes.getNamedItem('userLogin').value;
      quoteInfo.threadId = this.threadId;

      this.quoteInfo = quoteInfo;
      tempEl.querySelector('quote').remove();
      this.post.body = tempEl.innerHTML;
    }
  }

  private convertLanguageKeys(keys: string): string {
    let result = [];
    if(!keys) return result.toString();
    let keyArray = keys.replace(' ', '').split(',');
    keyArray.forEach(key => {
      result.push(this.translateService.instant('general.languages.'+key))
    })
    return result.toString();
  }

  private convertRoleKeys(keyArray: string[]): string {
    let result = [];
    keyArray.forEach(key => {
      result.push(this.translateService.instant('general.roles.' + key))
    })
    return result.toString();
  }

  public vote(voteType: VoteType){
    if(this.post.ownVote && voteType === this.post.ownVote.voteType) {
      this.deleteVote();
      return;
    }

    let voteRequest = new VoteRequestBodyDto();
    voteRequest.voteType = voteType;
    voteRequest.postId = this.post.id;
    this.forumService.createVote(voteRequest).toPromise().then(res => {
      this.getPost();
    }).catch((error) => {
      this.messageService.error(error);
    })
  }

  private getPost() {
    this.forumService.getPostById(this.post.id).toPromise().then(res => {
      this.post = res;
      this.checkQuote()
    });
  }

  private deleteVote() {
    this.forumService.deleteVote(this.post.ownVote.id).toPromise().then(res => {
      this.getPost()
    }).catch((error) => {
      this.messageService.error(error);
    })
  }

  public deletePost(){
    this.confirmationService.confirm({
      acceptLabel: this.translateService.instant('general.yes'),
      rejectLabel: this.translateService.instant('general.no'),
      header: this.translateService.instant('general.headerConfirmation'),
      message: this.translateService.instant('Thread.post.deleteConfirmation'),
      accept: () => {
        this.onDelete.emit(this.post);
      }
    });
  }

  public editPost(event){
    this.editView = false;
    this.post = event;
    this.checkQuote();
    this.messageService.success(this.post.title, this.translateService.instant('Thread.post.edited'))
  }

  public toggleEdit(){
    this.editView = !this.editView;
  }

  public cancelEdit(){
    this.editView = false;
  }

  onVote($event: any) {
    this.vote($event);
  }
}
