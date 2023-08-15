import { PagedModelEntityModelClass } from "../PagedModelEntityModelClass";
import {ThreadDto} from "./thread-dto";

export class PagedModelEntityModelThreadDto extends PagedModelEntityModelClass{
  public content: ThreadDto[] = [];
}
