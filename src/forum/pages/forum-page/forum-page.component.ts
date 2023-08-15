import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PageHeaderData } from 'src/forum/components/pageheader/pageheader.component';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: []
})
export class ForumPageComponent implements OnInit {

  public static readonly ROUTE = '/forum';
  public pageHeaderData: PageHeaderData;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
    this.pageHeaderData = {
      title: this.translateService.instant('Forum.page.title')
    };
  }

}
