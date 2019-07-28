const DEFAULT_ATTEMPTS = Infinity;
const DEFAULT_FREQUENCY = 1000;

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, duration);
  });
}

export default function poll(request, {
  attempts = DEFAULT_ATTEMPTS,
  frequency = DEFAULT_FREQUENCY
} = {}) {
  return request().catch(function retry(err) {
    if (attempts-- > 0) { // eslint-disable-line no-plusplus, no-param-reassign
      return delay(frequency).then(request).catch(retry);
    } else {
      throw err;
    }
  });
}
