import { PageItem } from "./PageResult.class";

export class PagedModelEntityModelClass{
  public links: {[rel: string]: PageItem} = undefined;
  public totalItems: number = undefined;
}
 