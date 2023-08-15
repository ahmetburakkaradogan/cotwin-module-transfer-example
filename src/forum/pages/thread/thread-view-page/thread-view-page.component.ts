import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ForumPageComponent} from '../../forum-page/forum-page.component';
import { PageHeaderData } from 'src/forum/components/pageheader/pageheader.component';

@Component({
  selector: 'app-thread-view-page',
  templateUrl: './thread-view-page.component.html'
})
export class ThreadViewPageComponent implements OnInit {

  public static readonly ROUTE = 'thread/:id';

  public pageHeaderData: PageHeaderData;
  id: string;
  constructor(private activatedRoute: ActivatedRoute, public translateService: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.pageHeaderData = {
      title: this.translateService.instant('Thread.view.title')
    };

    this.pageHeaderData.menuActions = [
      {
        label: this.translateService.instant('Thread.view.back'),
        tooltip: this.translateService.instant('Thread.view.backTip'),
        icon:'pi pi-fw pi-arrow-left',
        command: () => this.router.navigate([ForumPageComponent.ROUTE]),
        feature: 'viewForum'
      },
      {
        label: this.translateService.instant('Thread.view.newPost'),
        tooltip: this.translateService.instant('Thread.view.newPostTip'),
        icon:'pi pi-fw pi-plus',
        command: () => document.getElementById('new-post').scrollIntoView({behavior: 'smooth', block: 'center'}),
        feature: 'createPost'
      }
    ]
  }

  updatePageHeader(title: string){
    this.pageHeaderData.title = title;
  }
}
