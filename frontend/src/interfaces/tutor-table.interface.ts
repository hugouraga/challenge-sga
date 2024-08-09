import { tutorProps } from './tutor.interface';

export interface TutorTable {
  users: tutorProps[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: string;
  total: number;
  totalPages: number;
}
