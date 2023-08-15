import { ShallowUserDto } from "../user/shallow-user-dto";

export enum VoteType {
  'UP'='UP',
  'DOWN'='DOWN'
}

export class VoteDto {
  public id: string = undefined;
  public voteType: VoteType = undefined;
  public user: ShallowUserDto = undefined;
}
