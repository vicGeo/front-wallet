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

  const contextValues = useMemo(() => ({
    data, setData
  }), [data, setData])

  const handletest = () => {
    const newMovements = {
      id: data.movements.length + 1,
      amount: 2000,
      concept: 1,
      date: new Date(),
      order: 'prueba',
    };
    setData((prevData) => ({
      ...prevData,
      movements: [...prevData.movements, newMovements],
    }));
  };

  return (
    <WalletContext.Provider value={contextValues}>
    <main className='grid place-items-center'>
      {JSON.stringify(data)}
      <section>
        <button onClick={handletest}>Prueba</button>
      </section>
    </main>
    </WalletContext.Provider>
  );
}

export default App;
