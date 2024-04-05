export interface IUserState {
  currentUser: IUser | null;
  allUsers: IUser[];
}

export interface IUser {
  id: string;
  name: string;
}

export type SetUserPayload = {
  user: IUser | null;
};
