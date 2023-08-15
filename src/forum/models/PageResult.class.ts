export class PageResult<Item = any> {
    public items: Item[] = [];
    public page: number;
    public totalItems: number;
    public totalPages: number;
}

export class PageItem{
  public page: number = undefined;
  public size: number = undefined;
  public rel: string = undefined;
  public url: string = undefined;
}
