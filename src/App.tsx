import { useState, useEffect, useMemo } from 'react';
import { IDataWallet } from './interfaces/IDataWallet/IDataWallet';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { WalletTable } from './components/WalletTable';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import { WalletContext } from './context';
import { Header } from './components/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  const [data, setData] = useState<IDataWallet>({} as IDataWallet);

  const fetchData = () => {
    axios
      .get('/db.json')
      .then((res) => setData(res.data as IDataWallet))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    isEmpty(data) && fetchData();
  }, [data]);

  const contextValues = useMemo(
    () => ({
      data,
      setData,
    }),
    [data, setData]
  );

  return (
    <WalletContext.Provider value={contextValues}>
      <main className='container mx-auto px-4 gap-4'>
        <Toaster position='top-center' reverseOrder={false} />
        <Header />
        <WalletTable />
      </main>
    </WalletContext.Provider>
  );
}

export default App;
