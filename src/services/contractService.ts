import { ethers, BigNumber } from 'ethers';
import { Observable } from 'rxjs';
import { LatestAnswer } from '~types';

const ABI = [
  'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
  'event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 updatedAt)',
];

const toTimeStamp = (bigNumber: BigNumber) => new Date(bigNumber.toNumber() * 1000).toISOString();
const toString = (bigNumber: BigNumber) => bigNumber.toString();

export const latestAnswer = (address: string): Observable<LatestAnswer> =>
  new Observable((subscriber) => {
    const projectId = 'dd71a1758118408cb01a33faffc7a402';
    const network = 'homestead';
    const provider = new ethers.providers.InfuraProvider(network, projectId);
    const contract = new ethers.Contract(address, ABI, provider);

    contract.functions
      .latestRoundData()
      .then(({ updatedAt, answer }: { updatedAt: BigNumber; answer: BigNumber }) => {
        subscriber.next({ updatedAt: toTimeStamp(updatedAt), answer: toString(answer) });
      });

    contract.on('AnswerUpdated', (answer, _, updatedAt) => {
      subscriber.next({ updatedAt: toTimeStamp(updatedAt), answer: toString(answer) });
    });
  });
