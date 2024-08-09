export interface paginated {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: string;
  total: number;
  totalPages: number;
}
