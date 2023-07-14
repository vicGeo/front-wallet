import { Dispatch, SetStateAction } from 'react';

interface Props {
  setShowModalDeposit: Dispatch<SetStateAction<boolean>>;
  setShowModalWithdraw: Dispatch<SetStateAction<boolean>>;
}

const Fondos = ({ setShowModalDeposit, setShowModalWithdraw }: Props) => {
  return (
    <div className='flex gap-4'>
      <button
        onClick={() => setShowModalWithdraw(true)}
        className='bg-bigbuy-blue  text-white font-medium py-2 px-4 rounded'
      >
        Retirar fondos
      </button>
      <button
        onClick={() => setShowModalDeposit(true)}
        className='bg-bigbuy-yellow text-black font-medium py-2 px-4 rounded'
      >
        Ingresar fondos
      </button>
    </div>
  );
};

export default Fondos;
