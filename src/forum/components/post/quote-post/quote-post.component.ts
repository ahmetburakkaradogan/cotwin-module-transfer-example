import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ReplyPost } from "src/forum/models/post/post-dto";
import { ThreadViewPageComponent } from "src/forum/pages/thread/thread-view-page/thread-view-page.component";


@Component({
  selector: 'app-quote-post',
  templateUrl: './quote-post.component.html'
})
export class QuotePostComponent implements OnInit {

  @Input()
  public data: ReplyPost;

  public threadRoute: string;

  public userRoute: string;

  @Input()
  public postIndex: number;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
    this.threadRoute = '/'
    this.userRoute = '/'
  }
}
