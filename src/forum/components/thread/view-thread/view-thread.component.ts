import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PageResult } from "src/forum/models/PageResult.class";
import { Pageable } from "src/forum/models/Pageable.class";
import { PostDto, ReplyPost } from "src/forum/models/post/post-dto";
import { PostRequestBodyDto } from "src/forum/models/post/post-request-body-dto";
import { CustomMessageService } from "src/forum/services/custom-message.service";
import { ForumService } from "src/forum/services/forum.service";
import { CreatePostComponent } from "../../post/create-post/create-post.component";

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html'
})
export class ViewThreadComponent implements OnInit {

  @Input()
  id: string;

  @ViewChild(CreatePostComponent)
  createPostChild: CreatePostComponent;

  @Output()
  onPageHeaderData = new EventEmitter<string>();

  public posts: PostDto[];

  private fragment: string;

  public data: PageResult<PostDto> = {
    items: [],
    totalItems: 0,
    totalPages: 0,
    page: 0
  };

  public defaultItemsPerPage: number = 5;
  public defaultSort: string[] = ['createdDate']

  public pageable: Pageable = {
    page: 0,
    size: this.defaultItemsPerPage,
    sort: this.defaultSort,
  };

  constructor(private route: ActivatedRoute,
              private forumService: ForumService,
              private translateService: TranslateService,
              private messageService: CustomMessageService) { }

  scrollToCreateNewPost(value?: ReplyPost){
    const el = document.getElementById('new-post');
    this.setCreatePostBody(value);
    el.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  public setCreatePostBody(value: ReplyPost){
    const existingValues = this.createPostChild.getFormValues(new PostRequestBodyDto());
    const body = ViewThreadComponent.createQuoteMessage(value) + (existingValues.body != null ? existingValues.body : '');
    const title = value.postTitle + ' ' + (existingValues.title != null ? existingValues.title : '');
    this.createPostChild.setFormBody(body, title);
  }

  private static createQuoteMessage(post: ReplyPost): string{
    return `<quote postId="${post.postId}" postBody="${post.postBody}" postTitle="${post.postTitle}" postCreatedTime="${post.postCreatedTime}" postIndex="${post.postIndex}" userId="${post.userId}" userLogin="${post.userLogin}"></quote>`
  }

  protected loadData(filter: any, pageable: Pageable): Promise<PageResult<PostDto>> {
    let temp = new PageResult();
    return this.forumService.getPostListByThreadId(this.id ,filter, pageable).toPromise().then((data) => {
      return new Promise((resolve, reject) => {
        temp.items = data.content;
        temp.page = pageable.page;
        temp.totalItems = data.totalItems;
        temp.totalPages = data.links['last'].page;
        resolve(temp);
        this.onTitleLoaded(temp.items[0].thread.title);
      });
    });
  }

  ngOnInit(): void {
    this.reload();
    this.route.fragment.subscribe(fragment => {this.fragment = fragment;})
  }

  onNewPost(post: PostDto){
    const newItemIndex = Number(this.data.totalItems) + 1;
    this.pageable.page = Math.ceil(newItemIndex / this.pageable.size)-1; //Last page
    this.loadData({}, this.pageable).then(result => {
      this.data = result;
      this.posts = result.items;

      //Scroll to last post
      let lastPostEl = document.getElementById('post'+newItemIndex);
      if(lastPostEl != null){
        lastPostEl.scrollIntoView({behavior: 'smooth', block: 'center'});
      }else{
        // FIXME: lastPostEl becomes undefined if post is created within the same page, it works with setting a timeout, need a better way.
        setTimeout(() => document.getElementById('post'+newItemIndex).scrollIntoView({behavior: 'smooth', block: 'center'}), 1)
      }
    })
  }

  onPostRemove(post: PostDto){
    if(this.pageable.page === 0 && post.id === this.posts[0].id){
      this.messageService.error(null, this.translateService.instant('Thread.post.cannotDeleteFirstPost'));
      return;
    }
    this.forumService.deletePost(post.id).toPromise().then(res => {
      // this.posts = this.posts.filter(postIter => postIter.id != post.id);
      this.messageService.success(post.title, this.translateService.instant('Thread.post.deleted'));
      this.reload();
    })
  }

  onTitleLoaded(title: string){
    this.onPageHeaderData.emit(title);
  }

  paginate(event){
    this.pageable.page = event.page;
    this.pageable.size = event.rows;
    this.reload();
  }

  public reload(): void{
    this.loadData({}, this.pageable).then(result => {
      this.data = result;
      this.posts = result.items;
    })
  }
}
