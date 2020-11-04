import { ajax } from 'rxjs/ajax';

import { get } from './apiService';

jest.mock('rxjs/ajax', () => ({
  ajax: jest.fn(),
}));

describe('Api Request Service', () => {
  describe('get', () => {
    it('makes an ajax get request with provided options', () => {
      const url = 'foo.bar';
      const body = { foo: 'bar' };
      const headers = { 'X-Foo': 'bar' };
      const responseType = 'text';

      get({ url, body, headers, responseType });
      expect(ajax).toHaveBeenCalledWith(
        expect.objectContaining({
          url,
          body,
          headers: expect.objectContaining(headers),
          responseType,
        })
      );
    });
  });
});
