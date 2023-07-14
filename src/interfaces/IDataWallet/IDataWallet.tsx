import { IMovement } from '../IMovement/IMovement';

interface IDataWallet {
  balance: number;
  movements: IMovement[];
}

type IDataWalletGet = Promise<IDataWallet>;

export type {
  IDataWalletGet,
  IDataWallet
};
