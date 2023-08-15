import {MenuAction} from './MenuAction.class';
import {MenuItem} from "primeng/api";

export class MenuActionGroup {
  public label: string;
  public tooltip?: string;
  public tooltipPosition?: string;
  public icon?: string;
  public style?: string;
  public items?: MenuItem[];
  public actions?: MenuAction[];
  public feature?: string;

  constructor(label: string, tooltip?: string, tooltipPosition?: string, icon?: string, style?: string, items?: MenuItem[], actions?: MenuAction[], feature?: string) {
    this.label = label;
    this.tooltip = tooltip;
    this.tooltipPosition = tooltipPosition;
    this.icon = icon;
    this.style = style;
    this.items = items;
    this.actions = actions;
    this.feature = feature;
  }
}
