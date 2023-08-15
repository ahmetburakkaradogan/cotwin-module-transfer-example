export class MenuAction {
    public label: string;
    public tooltip: string;
    public tooltipPosition?: string;
    public icon?: string;
    public style?: string;
    public command: Function;
    public disabled?: boolean = false;
    public feature: string;
    public class?: string = "";
    public styleClass?: string = "";


  constructor(label: string, tooltip: string, tooltipPosition: string, icon: string, style: string, command: Function, feature: string, disabled?: boolean, styleClass?: string ) {
    this.label = label;
    this.tooltip = tooltip;
    this.tooltipPosition = tooltipPosition;
    this.icon = icon;
    this.style = style;
    this.command = command;
    this.disabled = disabled != null ? disabled:false;
    this.feature = feature;
    this.styleClass = styleClass;
  }
}
