export interface Config {
  test: {
    speed: number;
  };
}

export const defaultConfig: Config = {
  test: {
    speed: 0.005,
  },
};
