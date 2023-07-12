import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import './walletTable.scss';
import WalletContext from '../../context';

const WalletTable = () => {
  const { data } = useContext(WalletContext);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
      rowsPerPageOptions={[5, 10, 25, 50]}
      filters={filters}
      filterDisplay='row'
      header={header}
    >
      <Column field='order' header='PEDIDO'></Column>
      <Column field='date' header='FECHA' sortable></Column>
      <Column field='concept' header='CONCEPTO' sortable></Column>
      <Column field='amount' header='IMPORTE'></Column>
      <Column field='prevBalance' header='SALDO ANTERIOR'></Column>
      <Column field='actualBalance' header='SALDO POSTERIOR'></Column>
    </DataTable>
  );
};

export default WalletTable;
