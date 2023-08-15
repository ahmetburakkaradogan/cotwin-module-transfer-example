import { ShallowUserDto } from "../user/shallow-user-dto";
import {VoteDto} from "../vote/vote-dto";

export class ThreadDto {

  constructor(other: ThreadDto) {
    this.id = other.id;
    this.title = other.title;
    this.user = other.user;
    this.postCount = other.postCount;
    this.calculatedVoteCount = other.calculatedVoteCount;
    this.ownVote = other.ownVote;
    this.createdDate = other.createdDate;
  }

  public id: string = undefined;
  public title: string = undefined;
  public user: ShallowUserDto = undefined;
  public postCount: number = undefined;
  public calculatedVoteCount: number = undefined;
  public ownVote: VoteDto = undefined;
  public createdDate: string = undefined;
}
