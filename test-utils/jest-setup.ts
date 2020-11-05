import '@testing-library/jest-dom';

process.env = Object.assign(process.env, {
  INFURA_PROJECT_ID: 'project-id',
  INFURA_NETWORK: 'homestead',
  WEIWATCHERS_URL: 'https://weiwatchers-test.example.com',
});
