import { checkInput } from './inputCheck.js';

describe('RegExp: input', function () {
  it('should be a string', function () {
    const urlRegx = /^[a-zA-Z\s]{0,255}$/;
    const urlTest = 'L0nd0n';
    expect(urlRegx.test(urlTest)).toBe(false);
  });
});