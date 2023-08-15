import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PageHeaderData } from 'src/forum/components/pageheader/pageheader.component';

@Component({
  selector: 'app-create-thread-page',
  templateUrl: './create-thread-page.component.html'
})
export class CreateThreadPageComponent implements OnInit {

  public static readonly ROUTE = '/threads/new';
  public pageHeaderData: PageHeaderData;
  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
    this.pageHeaderData = {
      title: this.translateService.instant('Thread.createThread.title')
    };
  }


}
