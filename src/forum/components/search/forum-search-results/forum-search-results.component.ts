import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PageResult } from "src/forum/models/PageResult.class";
import { Pageable } from "src/forum/models/Pageable.class";
import { ThreadDetailDto } from "src/forum/models/thread/thread-detail-dto";
import { ThreadViewPageComponent } from "src/forum/pages/thread/thread-view-page/thread-view-page.component";
import { ForumService } from "src/forum/services/forum.service";


@Component({
  selector: 'app-forum-search-results',
  templateUrl: './forum-search-results.component.html',
  styleUrls: ['../forum-search.component.scss']

})
export class ForumSearchResultsComponent implements OnInit, OnChanges {

  @Input()
  filter: string;

  constructor(private route: ActivatedRoute, public translateService: TranslateService, private forumService: ForumService) {
  }

  public result: PageResult<ThreadDetailDto> = {
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
  threadViewRoute = ThreadViewPageComponent.ROUTE;

  ngOnInit(): void {
    this.query(this.filter);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.query(this.filter);
  }

  private query(filter: string) {
    return this.forumService.searchThreads(filter, this.pageable).toPromise().then(data => {
      this.result.totalItems = data.totalItems;

      this.result.items = data.content.map(thread => {
        let dto = new ThreadDetailDto(thread);

        dto.title = this.cleanupAndHighlightQuery(dto.title);
        dto.user.login = this.cleanupAndHighlightQuery(dto.user.login);

        dto.posts.forEach(post => {
          post.title = this.cleanupAndHighlightQuery(post.title);
          post.body = this.cleanupAndHighlightQuery(post.body);
        });
        dto.firstPost.body = this.cleanupAndHighlightQuery(dto.firstPost.body);

        return dto;
      });
      // console.log(JSON.stringify(data.content));
    });
  }

  paginate(event) {
    this.pageable.page = event.page;
    this.pageable.size = event.rows;
    this.query(this.filter);
  }

  private cleanupAndHighlightQuery(raw: string): string {
    return this.highlightQuery(this.cleanUpHtmlTags(raw));
  }

  private cleanUpHtmlTags(raw: string): string {
    var current = raw;
    var lastStartIndex = -1;
    while ((lastStartIndex = current.indexOf("<")) != -1) {
      var endIndex = current.indexOf(">", lastStartIndex);
      if (endIndex != -1) {
        current = current.slice(0, lastStartIndex) + current.slice(endIndex + 1);
      }
    }
    return current;
  }

  private highlightQuery(current: string): string {
    if (this.filter.length <= 0)
      return current;
    var highlighter = "<strong>" + this.filter + "</strong>"
    return current.split(this.filter).join(highlighter);
  }

}
