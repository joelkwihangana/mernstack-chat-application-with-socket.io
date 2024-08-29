export interface IUser {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface IGroupAdmin {
  name: string;
  email: string;
}

export interface IChat {
  _id: string;
  isGroupChat: boolean;
  users: IUser[];
  chatName: string;
  groupAdmin?: IGroupAdmin;
  latestMessage?: string;
}
