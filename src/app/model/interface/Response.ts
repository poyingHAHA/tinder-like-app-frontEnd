export interface Response
{
  success: boolean;
  code: number;
  message: string;
  data?: object;
}
