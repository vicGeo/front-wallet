import { createContext, Dispatch, SetStateAction } from 'react';
import IDataWallet from './interfaces/IDataWallet';

interface IWalletContext {
  data: IDataWallet;
  setData: Dispatch<SetStateAction<IDataWallet>>;
}

const WalletContext = createContext<IWalletContext>({} as IWalletContext);

export default WalletContext;
