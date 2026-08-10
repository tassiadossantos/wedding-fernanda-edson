import { describe, it, expect } from 'vitest';
import { getInitials } from '../Guestbook';

describe('getInitials', () => {
  it('returns initials from a full name', () => {
    expect(getInitials('Maria Silva')).toBe('MS');
  });

  it('returns single initial for single name', () => {
    expect(getInitials('Ana')).toBe('A');
  });

  it('handles more than two names', () => {
    expect(getInitials('João Pedro Silva')).toBe('JP');
  });

  it('handles empty string', () => {
    expect(getInitials('')).toBe('');
  });
});
