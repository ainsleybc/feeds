import { BigNumber } from 'bignumber.js';
import { formatDistance } from 'date-fns';
import { Feed } from '~types';

export const formatPrice = ({
  price,
  multiply,
  formatDecimalPlaces,
  decimalPlaces,
  valuePrefix,
}: Feed) => {
  if (!price) {
    return null;
  }

  const number = new BigNumber(price)
    .dividedBy(multiply)
    .shiftedBy(-formatDecimalPlaces)
    .toFixed(decimalPlaces, 3);

  return `${valuePrefix} ${Number.parseFloat(number).toString()}`;
};

export const formatDateDifference = ({ lastUpdated }: Feed, date = new Date()) => {
  if (!lastUpdated) {
    return null;
  }
  return formatDistance(new Date(lastUpdated), date, { addSuffix: true });
};
