interface FetchErrorArgument {
  message: string;
  status: number;
}

export class FetchError extends Error {
  status: number;
  constructor(error: FetchErrorArgument) {
    super(error.message);
    this.status = error.status;
  }
}
