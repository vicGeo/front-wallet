import { useState } from 'react';
import IDataWallet from './interfaces/IDataWallet';

function App() {
  const [data, setData] = useState<IDataWallet>({} as IDataWallet);
  return <main className='grid place-items-center'>BigBuy</main>;
}

export default App;
