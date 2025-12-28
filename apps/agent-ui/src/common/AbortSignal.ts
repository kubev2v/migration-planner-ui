export function newAbortSignal(
  delay?: number,
  abortMessage?: string,
): AbortSignal {
  const abortController = new AbortController();
  const signal = abortController.signal;

  if (delay) {
    window.setTimeout(() => {
      abortController.abort(abortMessage);
    }, delay);
  }

  return signal;
}
