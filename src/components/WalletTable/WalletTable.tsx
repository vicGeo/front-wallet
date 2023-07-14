import { useState, useContext} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { WalletContext } from '../../context';
import { Tag } from 'primereact/tag';
import IMovement from '../../interfaces/IMovement';
import { enumConcept, formatFullDate, formatNumber } from '../../utils';

import './walletTable.scss';

const WalletTable = () => {
  const { data } = useContext(WalletContext);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.EQUALS },
    amount: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className='flex justify-content-end'>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder='Buscar por importe'
          />
        </span>
      </div>
    );
  };

  const orderBodyTemplate = (movement: IMovement) => {
    return <p>{movement.order ?? '-'}</p>;
  };
  const dateBodyTemplate = (movement: IMovement) => {
    return <p>{formatFullDate(movement.date) ?? '-'}</p>;
  };

  const amountBodyTemplate = (movement: IMovement) => {
    return <p>{formatNumber(movement.amount)}</p>;
  };
  const prevBalanceBodyTemplate = (movement: IMovement) => {
    return (
      <p>{movement.prevBalance ? formatNumber(movement.prevBalance) : '-'}</p>
    );
  };
  const actualBalanceBodyTemplate = (movement: IMovement) => {
    return (
      <p>
        {movement.actualBalance ? formatNumber(movement.actualBalance) : '-'}
      </p>
    );
  };

  const conceptBodyTemplate = (movement: IMovement) => {
    return (
      <Tag
        value={
          movement.concept === enumConcept.INGRESO ? 'Ingreso' : 'Retirada'
        }
        severity={getSeverity(movement)}
      ></Tag>
    );
  };

  const getSeverity = (movement: IMovement) => {
    switch (movement.concept) {
      case enumConcept.INGRESO:
        return 'success';
      case enumConcept.RETIRADA:
        return 'danger';
      default:
        return null;
    }
  };

  const header = renderHeader();

  return (
    <DataTable
      value={data.movements}
      tableStyle={{ minWidth: '50rem' }}
      sortField='date'
      sortOrder={-1}
      paginator
      rows={5}
      totalRecords={data?.movements?.length}
      rowsPerPageOptions={[5, 10]}
      filters={filters}
      filterDisplay='row'
      header={header}
    >
      <Column
        field='order'
        header='N° PEDIDO'
        body={orderBodyTemplate}
      ></Column>
      <Column
        field='date'
        header='FECHA'
        body={dateBodyTemplate}
        sortable
      ></Column>
      <Column
        field='concept'
        header='CONCEPTO'
        body={conceptBodyTemplate}
        style={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
        sortable
      ></Column>
      <Column
        field='amount'
        header='IMPORTE'
        body={amountBodyTemplate}
        style={{
          textAlign: 'right',
          justifyContent: 'right',
        }}
        sortable
      ></Column>
      <Column
        field='prevBalance'
        header='SALDO ANTERIOR'
        body={prevBalanceBodyTemplate}
        style={{
          textAlign: 'right',
          justifyContent: 'right',
        }}
      ></Column>
      <Column
        field='actualBalance'
        header='SALDO POSTERIOR'
        body={actualBalanceBodyTemplate}
        style={{
          textAlign: 'right',
          justifyContent: 'right',
        }}
      ></Column>
    </DataTable>
  );
};

export default WalletTable;
