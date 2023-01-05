export type LoginResponse = {
  accessToken: string;
};

export type UserType = {
  id: number;
  email: string;
  username: string;
  name: string | null;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
};
