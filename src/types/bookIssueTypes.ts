export interface CreateBookIssueBody {
  transaction_code: string;
  member_id: number;
  book_id: number;
  issue_date: Date;
  due_date: Date;
  return_date?: Date;
  status_id: number;
  processed_by_id: number;
}

export interface UpdateBookIssueBody {
  transaction_code?: string;
  member_id?: number;
  book_id?: number;
  issue_date?: Date;
  due_date?: Date;
  return_date?: Date;
  status_id?: number;
  processed_by_id?: number;
}

export interface BookIssueParams {
  id: string;
}
