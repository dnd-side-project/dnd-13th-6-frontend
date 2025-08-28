interface APIResponse<T> {
  result: T;
  stats: string;
  code: string;
  message: string;
}

export type { APIResponse };
