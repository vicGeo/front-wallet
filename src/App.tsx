import { useState, useEffect, useMemo } from 'react';
import { IDataWallet } from './interfaces/IDataWallet/IDataWallet';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { WalletTable } from './components/WalletTable';
import 'primereact/resources/themes/tailwind-light/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css';
import { WalletContext } from './context';
import {
  enumConcept,
  formatFullDate,
  formatNumber,
  randomOrder,
} from './utils';
import { Header } from './components/Header';

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

  const handleIngresar = () => {
    const newData = {
      balance: data.balance + 50,
      movements: [
        ...data.movements,
        {
          id: data.movements.length + 1,
          amount: 50,
          concept: enumConcept.INGRESO,
          date: formatFullDate(new Date(Date.now()).toLocaleString('es-ES')),
          order: randomOrder(),
          prevBalance: data.balance,
          actualBalance: data.balance + 50,
        },
      ],
    };
    setData(newData);
  };
  const handleRetirar = () => {
    const newData = {
      balance: data.balance - 50,
      movements: [
        ...data.movements,
        {
          id: data.movements.length + 1,
          amount: 50,
          concept: enumConcept.RETIRADA,
          date: formatFullDate(new Date(Date.now()).toLocaleString('es-ES')),
          order: randomOrder(),
          prevBalance: data.balance,
          actualBalance: data.balance - 50,
        },
      ],
    };
    setData(newData);
  };

  return (
    <WalletContext.Provider value={contextValues}>
      <main className='container mx-auto px-4 gap-4'>
        <Header />
        <WalletTable />
      </main>
    </WalletContext.Provider>
  );
}

export default App;
