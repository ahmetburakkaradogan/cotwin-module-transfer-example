import {Component, Input, OnInit} from '@angular/core';
import { MenuAction } from 'src/forum/menu/MenuAction.class';
import { MenuActionGroup } from 'src/forum/menu/MenuActionGroup.class';
import { MultiActions } from 'src/forum/menu/MultiActions.class';


export class PageHeaderData {
    public title?: string;
    public subTitle?: string;
    public multiActions?: MultiActions;
    public menuActions?: (MenuAction | MenuActionGroup)[];
    public reloadCallback?: () => void;
    public navigateBackCallback?: () => void;

  constructor(title: string, subTitle: string, menuActions: (MenuAction | MenuActionGroup)[]) {
    this.title = title;
    this.subTitle = subTitle;
    this.menuActions = menuActions;
  }
}

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss']
})
export class PageheaderComponent implements OnInit {
  @Input()
  public data: PageHeaderData;

  ngOnInit(): void {
  }

}
