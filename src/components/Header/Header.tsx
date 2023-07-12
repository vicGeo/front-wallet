import { useState, useContext } from 'react';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WalletContext } from '../../context';
import { formatNumber } from '../../utils';
import { Fondos } from '../Fondos';
import { Dialog } from 'primereact/dialog';

const Header = () => {
  const { data } = useContext(WalletContext);
  const [showModalDeposit, setShowModalDeposit] = useState<boolean>(false);
  const [showModalWithdraw, setShowModalWithdraw] = useState<boolean>(false);
  return (
    <>
      <header className='flex flex-row justify-between py-8 items-center'>
        <section className='header-container'>
          <FontAwesomeIcon
            icon={faRightLeft}
            className='mr-2'
            style={{ color: '#3e51f9' }}
          />
          <span className='font-bold text-lg font-roboto'>Movimientos</span>
        </section>
        <section className='flex flex-row items-center'>
          <div className='mr-6'>
            <span className='mr-1 font-bold text-xl text-bigbuy-blue'>
              Saldo actual:
            </span>
            <span className='text-lg text-bigbuy-blue'>
              {formatNumber(data.balance)}
            </span>
          </div>
          <div className=''>
            <Fondos
              setShowModalDeposit={setShowModalDeposit}
              setShowModalWithdraw={setShowModalWithdraw}
            />
          </div>
        </section>
      </header>
      <Dialog
        header='Ingresar fondos'
        visible={showModalDeposit}
        style={{ width: '30vw' }}
        onHide={() => setShowModalDeposit(false)}
      >
        <p className='m-0'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
      </Dialog>
      <Dialog
        header='Retirar fondos'
        visible={showModalWithdraw}
        style={{ width: '30vw' }}
        onHide={() => setShowModalWithdraw(false)}
      >
        <p className='m-0'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
      </Dialog>
    </>
  );
};

export default Header;
