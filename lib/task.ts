export interface Task {
  id: number;
  subject: string;
  title: string;
  deadline: string;

  weekly: boolean;

  // ←追加
  weekday?: number;

  completed: boolean;

  createdAt: string;

  lastCompletedAt?: string;
  lastRevivedAt?: string;
}