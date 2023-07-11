import { useState, useEffect } from 'react';
import { IDataWallet } from './interfaces/IDataWallet/IDataWallet';
import axios from 'axios';

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

  return (
    <main className='grid place-items-center'>{JSON.stringify(data)}</main>
  );
}

export default App;
