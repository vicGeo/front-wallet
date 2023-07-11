import { IMovement } from '../IMovement/IMovement';

export interface IDataWallet {
  balance: number;
  movements: IMovement[];
}
