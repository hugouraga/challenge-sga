import { tutorialInterface } from "./tutorial.interta";

export interface paginated {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: string;
  total: number;
  totalPages: number;
}

export interface TutorialPaginatedResponse {
  tutorials: tutorialInterface[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}