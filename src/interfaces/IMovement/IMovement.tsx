export interface IMovement {
  id: number;
  amount: number;
  concept: number;
  date: string | Date;
  order?: string;
  prevBalance?: number;
  actualBalance?: number;
}
