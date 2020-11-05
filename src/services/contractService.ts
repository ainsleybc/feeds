import { ethers, BigNumber } from 'ethers';
import { Observable } from 'rxjs';
import { config } from '~config';
import { LatestAnswer } from '~types';

const ABI = [
  'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
  'event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 updatedAt)',
];

const toTimeStamp = (bigNumber: BigNumber) => new Date(bigNumber.toNumber() * 1000).toISOString();
const toString = (bigNumber: BigNumber) => bigNumber.toString();

export const latestAnswer = (address: string): Observable<LatestAnswer> =>
  new Observable((subscriber) => {
    const { infuraNetwork, infuraProjectId } = config;
    const provider = new ethers.providers.InfuraProvider(infuraNetwork, infuraProjectId);
    const contract = new ethers.Contract(address, ABI, provider);

    contract.functions
      .latestRoundData()
      .then(({ updatedAt, answer }: { updatedAt: BigNumber; answer: BigNumber }) => {
        subscriber.next({ updatedAt: toTimeStamp(updatedAt), price: toString(answer) });
      });

    contract.on('AnswerUpdated', (answer, _, updatedAt) => {
      console.log(toString(answer));
      subscriber.next({ updatedAt: toTimeStamp(updatedAt), price: toString(answer) });
    });
  });
