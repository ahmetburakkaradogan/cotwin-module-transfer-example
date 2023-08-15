import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ForumService } from 'src/forum/services/forum.service';
import { ForumSearchPageComponent } from 'src/forum/pages/search/forum-search-page.component';


@Component({
  selector: 'forum-search-component',
  templateUrl: './forum-search.component.html',
  styleUrls: ['./forum-search.component.scss']
})
export class ForumSearchComponent implements OnInit {

  searchKeyword;

  constructor(public translateService: TranslateService, private forumService: ForumService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.searchKeyword = params.keyword;
      });
  }

  search(event: Event) {
    let searchKeyword = (event.target as HTMLInputElement).value;
    console.log(searchKeyword);
    this.router.navigate([ForumSearchPageComponent.ROUTE],{queryParams: {keyword: searchKeyword}});
  }
}

