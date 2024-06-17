export interface ICreateAuthor {
  email: string;
  firstName: string;
  lastName: string;
  dob: Date;
}

export type IUpdateAuthor = Omit<ICreateAuthor, 'email'>;
