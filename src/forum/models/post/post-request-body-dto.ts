export class PostRequestBodyDto {


  constructor(title?: string, body?: string, threadId?: string) {
    this.title = title;
    this.body = body;
    this.threadId = threadId;
  }

  public title: string = undefined;
  public body: string = undefined;
  public threadId: string = undefined;

}
