export interface IUser {
    Id: number,
    FirstName: string,
    LastName: string,
    Gender: string
}
export class User implements IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Gender: string;
}
export class SearchUser {
  FirstName: string = '';
  LastName: string = '';
}
