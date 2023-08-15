import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import { PageHeaderData } from "src/forum/components/pageheader/pageheader.component";

@Component({
  selector: 'forum-search-page',
  templateUrl: './forum-search-page.component.html',
  styleUrls: []
})
export class ForumSearchPageComponent implements OnInit {
  public static readonly ROUTE = '/forum/search';
  public pageHeaderData: PageHeaderData;

  ngOnInit(): void {
    this.pageHeaderData = {
      title: this.translateService.instant('Forum.search.title')
    };
  }

  constructor(public translateService: TranslateService) {
  }

}
