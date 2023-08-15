import {VoteDto} from "../vote/vote-dto";
import {ThreadDto} from "../thread/thread-dto";
import { UserPostDto } from "../user/user-post-dto";

export class PostDto {

  constructor(other: PostDto) {
    this.id = other.id;
    this.title = other.title;
    this.body = other.body;
    this.user = other.user;
    this.calculatedVoteCount = other.calculatedVoteCount;
    this.createdDate = other.createdDate;
    this.ownVote = other.ownVote;
    this.thread = other.thread;
  }

  public id: string = undefined;
  public title: string = undefined;
  public body: string = undefined;
  public user: UserPostDto = undefined;
  public calculatedVoteCount: number = 0;
  public createdDate: string = undefined;
  public ownVote: VoteDto = undefined;
  public thread: ThreadDto = undefined;
}

export class ReplyPost {
  public postId: string = undefined;
  public postBody: string = undefined;
  public postTitle: string = undefined;
  public postCreatedTime: string = undefined;
  public userId: string = undefined;
  public userLogin: string = undefined;
  public postIndex: number = undefined;
  public threadId: string = undefined;
}
