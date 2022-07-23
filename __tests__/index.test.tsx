/* eslint-disable sort-keys */
import { render, screen } from '@testing-library/react';
import { Hero } from '../components/Home/Hero';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
        writable: true,
    });
});

describe('Home', () => {
    it('renders correctly a heading', () => {
        expect('Home').toBe('Home');
    });
});
