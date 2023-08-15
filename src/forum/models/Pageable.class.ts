export class Pageable {
    public page: number = undefined;
    public size: number = undefined;
    public sort: string[] = [];

  constructor(page: number, size: number, sort: string[]) {
    this.page = page;
    this.size = size;
    this.sort = sort
  }
}

export enum SortDirection {
  'asc'='asc',
  'desc'='desc'
}
