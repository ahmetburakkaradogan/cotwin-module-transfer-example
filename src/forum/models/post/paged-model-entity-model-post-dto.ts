import { PagedModelEntityModelClass } from "../PagedModelEntityModelClass";
import {PostDto} from "./post-dto";

export class PagedModelEntityModelPostDto extends PagedModelEntityModelClass{
  public content: PostDto[] = [];
}
