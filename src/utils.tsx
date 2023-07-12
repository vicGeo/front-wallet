export const enumConcept = {
  INGRESO: 0,
  RETIRADA: 1,
};

export const formatNumber = (num: number) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    useGrouping: true,
  });
  return formatter.format(num).replace('€', "");
};
