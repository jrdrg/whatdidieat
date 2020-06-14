export function promisify<TData, TErr>(
  fn: (cb: (err: TErr, data: TData) => void) => void
): Promise<TData> {
  return new Promise((res, rej) => {
    fn((err, data) => {
      if (err) {
        return rej(err);
      }
      return res(data);
    });
  });
}
