import { scream } from '../src/index';

test('test Greeter', () => {
    expect(scream('Alice')).toBe('ALICE!!!!');
});
