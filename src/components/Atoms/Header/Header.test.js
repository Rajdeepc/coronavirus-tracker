import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header.js'; // importing the file to test

afterEach(cleanup);

it('renders', () => {
    const { asFragment } = render(<Header text= "I am header" />) // asFramgment return html for snapshot testing
    expect(asFragment()).toMatchSnapshot();
});

it('inserts text in h1', () => {
    const { getByTestId, getByText } = render(<Header text="I am header" />);
    expect(getByTestId('h1tag')).toHaveTextContent('I am header');
    expect(getByText('I am header')).toHaveClass('fancy-h1');
})