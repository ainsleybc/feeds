import { BigNumber } from 'bignumber.js';
import { ethers, Contract } from 'ethers';
import { latestAnswer } from './contractService';

jest.mock('ethers', () => ({
  ethers: {
    providers: { InfuraProvider: jest.fn() },
    Contract: jest.fn(),
  },
}));

describe('latestAnswer', () => {
  it('emits the latest answer when subscribed to', (done) => {
    const testData = {
      updatedAt: new BigNumber('0x5fa30dd6'),
      answer: new BigNumber('0x01428f28d5'),
    };

    jest
      .spyOn(ethers.providers, 'InfuraProvider')
      .mockReturnValue(new ethers.providers.InfuraProvider());

    jest.spyOn(ethers, 'Contract').mockReturnValue(({
      functions: { latestRoundData: () => new Promise((resolve) => resolve(testData)) },
      on: jest.fn(),
    } as unknown) as Contract);

    latestAnswer('someAddress').subscribe((answer) => {
      expect(answer).toEqual({ price: '5411645653', updatedAt: '2020-11-04T20:23:50.000Z' });
      done();
    });
  });

  it('emits a new answer when new event is fired', (done) => {
    const testData = {
      updatedAt: new BigNumber('0x5fa310e6'),
      answer: new BigNumber('0x0208837531'),
    };

    jest
      .spyOn(ethers.providers, 'InfuraProvider')
      .mockReturnValue(new ethers.providers.InfuraProvider());

    jest.spyOn(ethers, 'Contract').mockReturnValue(({
      functions: {
        latestRoundData: () =>
          new Promise(() => {
            /* dont resolve */
          }),
      },
      on: (_: string, listener: (answer: BigNumber, id: BigNumber, updatedAt: BigNumber) => void) =>
        listener(testData.answer, new BigNumber(1), testData.updatedAt),
    } as unknown) as Contract);

    latestAnswer('someAddress').subscribe((answer) => {
      expect(answer).toEqual({ price: '8732767537', updatedAt: '2020-11-04T20:36:54.000Z' });
      done();
    });
  });
});
