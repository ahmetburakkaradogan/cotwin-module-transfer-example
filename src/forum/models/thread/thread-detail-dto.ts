import {ThreadDto} from "./thread-dto";
import {PostDto} from "../post/post-dto";

export class ThreadDetailDto extends ThreadDto {

  constructor(other: ThreadDetailDto) {
    super(other);
    this.posts = other.posts;
    this.firstPost = other.firstPost;
  }

  public posts: PostDto[] = [];
  public firstPost: PostDto;
  public shownPostNumber: number = 2;
  private _hiddenPostNumber: number = 0;

  get hiddenPostNumber(): number {
    return this.posts.length > this.shownPostNumber ? this.posts.length - this.shownPostNumber : 0;
  }
}
