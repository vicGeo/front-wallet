import { useState, useEffect, useMemo } from 'react';
import { IDataWallet } from './interfaces/IDataWallet/IDataWallet';
import axios from 'axios';
import WalletContext from './context';

function App() {
  const [data, setData] = useState<IDataWallet>({} as IDataWallet);

  const fetchData = () => {
    axios
      .get('/db.json')
      .then((res) => setData(res.data as IDataWallet))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          concept: 0,
          date: new Date(),
          order: 'pedido',
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
          concept: 1,
          date: new Date(),
          order: 'pedido',
          prevBalance: data.balance,
          actualBalance: data.balance - 50,
        },
      ],
    };
    setData(newData);
  };

  return (
    <WalletContext.Provider value={contextValues}>
      <main className='grid place-items-center'>
        <section className='flex items-center justify-center'>
          <div className='flex flex-col gap-4'>
            <p className='flex items-center justify-center text-2xl font-medium'>
              {data.balance}
            </p>
            <div className='flex gap-4'>
              <button
                onClick={() => handleIngresar()}
                className='bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded'
              >
                Ingresar fondos
              </button>
              <button
                onClick={() => handleRetirar()}
                className='bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded'
              >
                Retirar fondos
              </button>
            </div>
          </div>
        </section>
      </main>
    </WalletContext.Provider>
  );
}

export default App;
