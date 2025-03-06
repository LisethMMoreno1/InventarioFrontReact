export type UpdateTool = {
  id: number;
  name: string;
  type?: string;
  code?: string;
  description: string;
  state?: boolean;
  created_at?: Date;
  updated_at?: Date;
};
