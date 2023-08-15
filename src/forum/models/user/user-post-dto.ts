export class UserPostDto {
  public id: string = undefined;
  public login: string = undefined;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public imageUrl: string = undefined;
  public langKey: string = '';
  public authorities: string[] = undefined;
}
