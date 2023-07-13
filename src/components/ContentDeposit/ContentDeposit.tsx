import { Dispatch, SetStateAction, useContext } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Controller, useForm } from 'react-hook-form';
import { WalletContext } from '../../context';
import { ErrorMessage } from '@hookform/error-message';
import { classNames } from 'primereact/utils';
import { enumConcept, formatFullDate, randomOrder } from '../../utils';

interface Props {
  setShowModalDeposit: Dispatch<SetStateAction<boolean>>;
}

const ContentDeposit = ({ setShowModalDeposit }: Props) => {
  const { data, setData } = useContext(WalletContext);
  const rhForm = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    const deposit = rhForm.getValues('deposit');
    const newData = {
      balance: data.balance + deposit,
      movements: [
        ...data.movements,
        {
          id: data.movements.length + 1,
          amount: deposit,
          concept: enumConcept.INGRESO,
          date: formatFullDate(new Date()),
          order: randomOrder(),
          prevBalance: data.balance,
          actualBalance: data.balance + deposit,
        },
      ],
    };
    setData(newData);
    setShowModalDeposit(false);
    rhForm.reset();
  };

  return (
    <div className='flex justify-center flex-col w-full'>
      <form onSubmit={rhForm.handleSubmit(onSubmit)}>
        <Controller
          name='deposit'
          control={rhForm.control}
          rules={{
            required: 'Debe añadir un importe',
            validate: (value) =>
              value > 0 ||
              'No se permiten ingresos en negativo o con valor de 0,00€',
          }}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor={field.name} className='font-bold block mb-2'>
                Ingreso
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
                name='deposit'
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

export default ContentDeposit;
