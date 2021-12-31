export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type KeysOfUnion<T> = T extends T ? keyof T : never;
