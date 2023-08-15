import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService } from "primeng/api";
import { PageResult } from "src/forum/models/PageResult.class";
import { Pageable } from "src/forum/models/Pageable.class";
import { ThreadDto } from "src/forum/models/thread/thread-dto";
import { VoteRequestBodyDto } from "src/forum/models/vote/vote-request-body-dto";
import { ThreadViewPageComponent } from "src/forum/pages/thread/thread-view-page/thread-view-page.component";
import { CustomMessageService } from "src/forum/services/custom-message.service";
import { ForumService } from "src/forum/services/forum.service";

@Component({
  selector: 'app-list-threads',
  templateUrl: './list-threads.component.html',
  styleUrls: ['./list-threads.component.scss'],
  providers: [ConfirmationService]
})
export class ListThreadsComponent implements OnInit {
  cols: any[];
  threads: ThreadDto[] = [];

  clonedThreads: { [s: string]: ThreadDto } = {};
  threadViewRoute: string;
  public ownId : string;

  public showFilters: boolean = false;

  public data: PageResult<ThreadDto> = {
    items: [],
    totalItems: 0,
    totalPages: 0,
    page: 0
  };

  public defaultItemsPerPage: number = 5;
  public pageable: Pageable = {
    page: 0,
    size: this.defaultItemsPerPage,
    sort: undefined,
  };

  constructor(
    public translateService: TranslateService,
    public router: Router,
    private forumService: ForumService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadData({}, this.pageable).then(result => {
      this.data = result;
      this.threads = result.items;
    })
    this.cols = [
      {header: this.translateService.instant('Thread.headers.votes')},
      {header: this.translateService.instant('Thread.headers.posts')},
      {header: this.translateService.instant('Thread.headers.comments')}
    ];
    this.threadViewRoute = ThreadViewPageComponent.ROUTE;
    this.ownId = "1";
  }

  protected loadData(filter: any, pageable: Pageable): Promise<PageResult<ThreadDto>> {
    let temp = new PageResult();
    return this.forumService.getThreadList(filter, pageable).toPromise().then((data) => {
      return new Promise((resolve, reject) => {
        temp.items = data.content;
        temp.page = pageable.page;
        temp.totalItems = data.totalItems;
        temp.totalPages = data.links['last'].page;
        resolve(temp);
      });
    });
  }

  public vote(voteType: string, thread: ThreadDto) {

    if( thread.ownVote && thread.ownVote.voteType === voteType){
      this.deleteVote(thread);
      return;
    }

    let voteRequest = new VoteRequestBodyDto();
    voteRequest.voteType = voteType;
    voteRequest.threadId = thread.id;
    this.forumService.createVote(voteRequest).toPromise().then(res => {
      this.getThreadById(thread.id);
    }).catch((error) => {
      this.messageService.error(error);
    })
  }

  private getThreadById(threadId: string) {
    this.forumService.getThreadById(threadId).toPromise().then(res => {
      const thread = this.threads.find(thread => thread.id == threadId);
      thread.calculatedVoteCount = res.calculatedVoteCount;
      thread.ownVote = res.ownVote;
    });
  }

  onVote($event: any, thread: ThreadDto) {
    this.vote($event, thread);
  }

  private deleteVote(thread: ThreadDto) {
    this.forumService.deleteVote(thread.ownVote.id).toPromise().then(res => {
      this.getThreadById(thread.id)
    }).catch((error) => {
      this.messageService.error(error);
    })
  }

  public deleteThread(threadId){
    this.confirmationService.confirm({
      acceptLabel: this.translateService.instant('general.yes'),
      rejectLabel: this.translateService.instant('general.no'),
      header: this.translateService.instant('general.headerConfirmation'),
      message: this.translateService.instant('Thread.deleteConfirmation'),
      accept: () => {
        this.forumService.deleteThread(threadId).toPromise().then(res => {
          this.threads = this.threads.filter(thread => thread.id != threadId);
          this.messageService.success(this.translateService.instant('Thread.deleted'))
        }).catch(error => {
          this.messageService.error(error);
        })
      }
    });

  }

  onRowEditInit(thread: ThreadDto){
    this.clonedThreads[thread.id] = {...thread};
  }

  onRowEditCancel(thread: ThreadDto, index: number){
    this.threads[index] = this.clonedThreads[thread.id];
    delete this.clonedThreads[thread.id];
  }

  onRowEditSave(thread: ThreadDto, index: number){
    if(thread.title && thread.title.length > 0 && thread.title.length <= 200){
      this.forumService.updateThread(thread.id, thread).toPromise().then(res => {
        delete this.clonedThreads[thread.id];
        this.messageService.success(this.translateService.instant('Thread.edited'), res.title);
      }).catch(error => {
        this.messageService.error(error);
      })
    }
    else{
      if(thread.title.length == 0){
        this.messageService.error(null, this.translateService.instant('Thread.titleEmptyError'))
      }
      if(thread.title.length > 200){
        this.messageService.error(null, this.translateService.instant('Thread.createThread.maxLengthTitle'))
      }
      this.threads[index] = this.clonedThreads[thread.id];
    }
  }

  paginate(event){
    this.pageable.page = event.page;
    this.pageable.size = event.rows;
    this.loadData({}, this.pageable).then(result => {
      this.data = result;
      this.threads = result.items;
    })
  }

  public setFilter(filter: any) {
    console.log(filter);
    this.loadData(filter, this.pageable).then(result => {
      this.data = result;
      this.threads = result.items;
    })
  }

  public toggleShowFilters() {
    this.showFilters = !this.showFilters;
  }
}
