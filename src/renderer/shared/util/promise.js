export const delay = (ms) => new Promise((f) => setTimeout(f, ms));

const defaults = {
  maxRetry: Infinity,
  interval: 500,
  intervalMultiplicator: 1.1
};

export function retry(f, options = defaults) {
  const { maxRetry, interval, intervalMultiplicator } = { ...defaults, ...options };

  function rec(remainingTry, i) {
    const result = f();
    if (remainingTry <= 0) {
      return result;
    }
    // In case of failure, wait the interval, retry the action
    return result.catch(() => {
      return delay(i).then(() => rec(remainingTry - 1, i * intervalMultiplicator));
    });
  }

  return rec(maxRetry, interval);
}

export const promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => fn(...args, (err, res) => {
    if (err) return reject(err);
    return resolve(res);
  }));
};

export const debounce = (fn, ms) => {
  let timeout;
  let resolveRefs = [];
  let rejectRefs = [];
  return (...args) => {
    const promise = new Promise((resolve, reject) => {
      resolveRefs.push(resolve);
      rejectRefs.push(reject);
    });
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      try {
        const res = await fn(...args);
        resolveRefs.forEach((r) => r(res));
      } catch (err) {
        rejectRefs.forEach((r) => r(err));
      }
      resolveRefs = [];
      rejectRefs = [];
    }, ms);
    return promise;
  };
};
