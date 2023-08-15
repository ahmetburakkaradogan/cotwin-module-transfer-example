import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { VoteDto, VoteType } from "src/forum/models/vote/vote-dto";


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() smallMode: boolean;
  @Input() ownVote?: VoteDto;
  @Input() voteCount?: number;

  @Output() vote = new EventEmitter;

  readonly VoteType = VoteType;

  constructor() {
  }

  ngOnInit(): void {
  }

  public giveVote(voteType: VoteType) {
    this.vote.emit(voteType);
  }
}
