import { URL } from 'whatwg-url';

import parseURL from 'browser/util/parseURL';

describe('parseURL', () => {
  it('handles .neo TLD with protocol', () => {
    expect(parseURL('nos://nos.neo')).toEqual(new URL('nos://nos.neo'));
  });

  it('handles .neo TLD with protocol, with path', () => {
    expect(parseURL('nos://nos.neo/foo/bar')).toEqual(new URL('nos://nos.neo/foo/bar'));
  });

  it('handles .neo TLD with protocol, with query string', () => {
    expect(parseURL('nos://nos.neo?foo=bar')).toEqual(new URL('nos://nos.neo?foo=bar'));
  });

  it('handles .neo TLD without protocol', () => {
    expect(parseURL('nos.neo')).toEqual(new URL('nos://nos.neo'));
  });

  it('handles .neo TLD without protocol, with path', () => {
    expect(parseURL('nos.neo/foo/bar')).toEqual(new URL('nos://nos.neo/foo/bar'));
  });

  it('handles .neo TLD without protocol, with query string', () => {
    expect(parseURL('nos.neo?foo=bar')).toEqual(new URL('nos://nos.neo?foo=bar'));
  });

  it('handles .com TLD with protocol', () => {
    expect(parseURL('https://example.com')).toEqual(new URL('https://example.com'));
  });

  it('handles .com TLD with protocol, with path', () => {
    expect(parseURL('https://example.com/foo/bar')).toEqual(new URL('https://example.com/foo/bar'));
  });

  it('handles .com TLD with protocol, with query string', () => {
    expect(parseURL('https://example.com?foo=bar')).toEqual(new URL('https://example.com?foo=bar'));
  });

  it('handles .com TLD without protocol', () => {
    expect(parseURL('example.com')).toEqual(new URL('http://example.com'));
  });

  it('handles .com TLD without protocol, with path', () => {
    expect(parseURL('example.com/foo/bar')).toEqual(new URL('http://example.com/foo/bar'));
  });

  it('handles .com TLD without protocol, with query string', () => {
    expect(parseURL('example.com?foo=bar')).toEqual(new URL('http://example.com?foo=bar'));
  });

  it('handles search queries', () => {
    expect(parseURL('example.com lol jk')).toEqual(
      new URL('https://duckduckgo.com/?q=example.com+lol+jk')
    );
  });
});
