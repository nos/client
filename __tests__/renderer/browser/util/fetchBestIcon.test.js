import nock from 'nock';

import fetchBestIcon from 'browser/util/fetchBestIcon';

describe('fetchBestIcon', () => {
  describe('when no URL is given', () => {
    const urls = [];

    it('returns undefined', async () => {
      expect(await fetchBestIcon(urls)).toBeUndefined();
    });
  });

  describe('when first URL uses data protocol', () => {
    const urls = [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='
    ];

    it('returns that value', async () => {
      expect(await fetchBestIcon(urls)).toEqual(urls[0]);
    });
  });

  describe('when first URL uses http protocol', () => {
    const urls = ['http://google.com/favicon.ico'];
    const data = 'fake-image-data';

    describe('when content-type is provided', () => {
      const type = 'image/vnd.microsoft.icon';

      beforeEach(() => {
        nock('http://google.com')
          .get('/favicon.ico')
          .reply(200, data, { 'content-type': type });
      });

      it('returns a data URL representation', async () => {
        const base64 = Buffer.from(data).toString('base64');
        expect(await fetchBestIcon(urls)).toEqual(`data:${type};base64,${base64}`);
      });
    });

    describe('when content-type is not provided', () => {
      beforeEach(() => {
        nock('http://google.com')
          .get('/favicon.ico')
          .reply(200, data);
      });

      it('returns a data URL representation', async () => {
        const base64 = Buffer.from(data).toString('base64');
        expect(await fetchBestIcon(urls)).toEqual(`data:application/octet-stream;base64,${base64}`);
      });
    });
  });

  describe('when all URLs fail to load', () => {
    const urls = ['http://google.com/favicon.ico', 'http://google.com/favicon.png'];

    beforeEach(() => {
      nock('http://google.com')
        .get('/favicon.ico')
        .reply(404);
      nock('http://google.com')
        .get('/favicon.png')
        .reply(404);
    });

    it('returns undefined', async () => {
      expect(await fetchBestIcon(urls)).toBeUndefined();
    });
  });

  describe('when first URL fails to load', () => {
    const urls = ['http://google.com/favicon.ico', 'http://google.com/favicon.png'];
    const data = 'fake-image-data';
    const type = 'image/png';

    beforeEach(() => {
      nock('http://google.com')
        .get('/favicon.ico')
        .reply(404);
      nock('http://google.com')
        .get('/favicon.png')
        .reply(200, data, { 'content-type': type });
    });

    it('returns a data URL representation of the first successful response', async () => {
      const base64 = Buffer.from(data).toString('base64');
      expect(await fetchBestIcon(urls)).toEqual(`data:${type};base64,${base64}`);
    });
  });
});
