export interface Config {
  test: {
    speed: number;
    zoom: number;
  };
}

export const defaultConfig: Config = {
  test: {
    speed: 0.005,
    zoom: 1,
  },
};
