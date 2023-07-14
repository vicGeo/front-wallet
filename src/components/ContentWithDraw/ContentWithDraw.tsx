import { Dispatch, SetStateAction, useContext } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Controller, useForm } from 'react-hook-form';
import { WalletContext } from '../../context';
import { ErrorMessage } from '@hookform/error-message';
import { classNames } from 'primereact/utils';
import { enumConcept, formatFullDate, randomOrder } from '../../utils';
import toast from 'react-hot-toast';

interface Props {
  setShowModalWithdraw: Dispatch<SetStateAction<boolean>>;
}

const ContentWithDraw = ({ setShowModalWithdraw }: Props) => {
  const { data, setData } = useContext(WalletContext);
  const rhForm = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    const withdraw = rhForm.getValues('withdraw');
    if (withdraw > data.balance) {
      rhForm.setError('withdraw', {
        type: 'manual',
        message: 'No puede retirar más saldo de su saldo actual',
      });
      return;
    }
    const newData = {
      balance: data.balance - withdraw,
      movements: [
        ...data.movements,
        {
          id: data.movements.length + 1,
          amount: withdraw,
          concept: enumConcept.RETIRADA,
          date: formatFullDate(new Date()),
          order: randomOrder(),
          prevBalance: data.balance,
          actualBalance: data.balance - withdraw,
        },
      ],
    };
    setData(newData);
    setShowModalWithdraw(false);
    rhForm.reset();
    toast.success('Retirada realizada correctamente!');
  };

  return (
    <div className='flex justify-center flex-col w-full'>
      <form onSubmit={rhForm.handleSubmit(onSubmit)}>
        <Controller
          name='withdraw'
          control={rhForm.control}
          rules={{
            required: 'Debe añadir un importe',
            validate: (value) =>
              value > 0 ||
              'No se permiten retiradas en negativo o con valor de 0,00€',
          }}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor={field.name} className='font-bold block mb-2'>
                <small className='text-gray-400'>
                  Para añadir el importe pulse la tecla "enter"
                </small>
              </label>
              <InputNumber
                id={field.name}
                value={field.value}
                mode='currency'
                currency='EUR'
                locale='de-DE'
                name={field.name}
                onValueChange={(e) => field.onChange(e.target.value)}
                inputClassName={classNames({ 'p-invalid': fieldState.error })}
                onBlur={field.onBlur}
                placeholder='0,00€'
              />
              <ErrorMessage
                errors={rhForm.formState.errors}
                name='withdraw'
                render={({ message }) => (
                  <p className='text-red-400 text-xs'>{message}</p>
                )}
              />
            </>
          )}
        />
      </form>
    </div>
  );
};

export default ContentWithDraw;
