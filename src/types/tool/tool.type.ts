export type Tool = {
  id: number;
  name: string;
  code: string;
  type: string;
  description: string;
  state?: boolean;
  created_at: Date;
  updated_at: Date;
};
