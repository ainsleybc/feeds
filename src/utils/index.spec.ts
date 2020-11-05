import { formatDateDifference, formatPrice } from './index';
import { Feed } from '~types';

describe('formatDateDifference', () => {
  it('formats the date to a pretty string', () => {
    expect(
      formatDateDifference(
        { lastUpdated: '2020-11-04T18:23:50.000Z' } as Feed,
        new Date('2020-11-04T20:23:50.000Z')
      )
    ).toEqual('about 2 hours ago');
  });

  it('returns null if no lastUpdated date', () => {
    expect(
      formatDateDifference({ lastUpdated: undefined } as Feed, new Date('2020-11-04T20:23:50.000Z'))
    ).toBeNull();
  });
});

describe('formatPrice', () => {
  it('formats the price according to the feed data', () => {
    expect(
      formatPrice({
        decimalPlaces: 3,
        formatDecimalPlaces: 0,
        multiply: '100000000',
        valuePrefix: '$',
        price: '7896978639994',
      } as Feed)
    ).toEqual('$ 78969.786');
  });

  it('returns null if no price', () => {
    expect(
      formatPrice({
        decimalPlaces: 3,
        formatDecimalPlaces: 0,
        multiply: '100000000',
        valuePrefix: '$',
        price: undefined,
      } as Feed)
    ).toBeNull();
  });
});
