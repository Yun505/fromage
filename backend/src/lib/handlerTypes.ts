/**
 * A simplified stand-in for API Gateway's event shape. 
 */
export interface HandlerEvent {
  pathParams: Record<string, string>;
  queryParams: Record<string, string | undefined>;
  body: unknown;
  userId?: string; // populated by auth middleware once real auth exists
}

export interface HandlerResult {
  statusCode: number;
  body: unknown;
}