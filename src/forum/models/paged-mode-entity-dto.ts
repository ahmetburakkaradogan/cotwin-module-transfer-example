import { PagedModelEntityModelClass } from "./PagedModelEntityModelClass";

export class PagedModeEntityDto<T> extends PagedModelEntityModelClass{
  public content: T[] = [];
}
