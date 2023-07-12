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
          date: formatFullDate(new Date(Date.now()).toLocaleString()),
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
          date: formatFullDate(new Date(Date.now()).toLocaleString()),
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
      <main className='grid place-items-center gap-4'>
        <section className='flex items-center justify-center'>
          <div className='flex flex-col gap-4'>
            <p className='flex items-center justify-center text-2xl font-medium'>
              {formatNumber(data.balance)}
            </p>
            <div className='flex gap-4'>
              <button
                onClick={() => handleIngresar()}
                className='bg-[#FFCE33] text-black font-medium py-2 px-4 rounded'
              >
                Ingresar fondos
              </button>
              <button
                onClick={() => handleRetirar()}
                className='bg-[#0072CA]  text-white font-medium py-2 px-4 rounded'
              >
                Retirar fondos
              </button>
            </div>
          </div>
        </section>
        <WalletTable />
      </main>
    </WalletContext.Provider>
  );
}

export default App;
