declare const garoon: {
  base: {
    request: {
      getRequestToken(): string;
    };
  };
};

declare module NodeJS {
  interface Global {
    garoon: typeof garoon;
    location: typeof location;
  }
}

declare const location:
  | {
      host: string;
      protocol: string;
      href: string;
    }
  | undefined;

declare class Blob {
  constructor(array: unknown[]);
}
