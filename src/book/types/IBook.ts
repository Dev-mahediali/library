export interface ICreateBook {
  title: string;
  isbn: string;
  publicationYear: number;
  categoryId: string;
  authorId: string;
}

export type IUpdateBook = Omit<ICreateBook, 'title'>;
