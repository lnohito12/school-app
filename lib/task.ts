export type Task = {
  id: number;
  subject: string;
  title: string;
  deadline: string;
  weekly: boolean;
  completed: boolean;
  
  createdAt: string;
lastCompletedAt?: string;
};