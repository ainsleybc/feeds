const fromEnv = (name: string) => {
  const value = process.env[name];

  if (value === '' || value === undefined) {
    throw new Error(`${name} env variable not defined`);
  }

  return value;
};

type Config = {
  infuraProjectId?: string;
  infuraNetwork?: string;
  weiWatchersUrl?: string;
};

export const config: Config = {
  infuraProjectId: fromEnv('INFURA_PROJECT_ID'),
  infuraNetwork: fromEnv('INFURA_NETWORK'),
  weiWatchersUrl: fromEnv('WEIWATCHERS_URL'),
};
