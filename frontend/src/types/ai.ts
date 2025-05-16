export interface IASearchResult {
  sql: string;
  data: Record<string, unknown>[];
}

export interface IASearchError {
  error: string;
}
