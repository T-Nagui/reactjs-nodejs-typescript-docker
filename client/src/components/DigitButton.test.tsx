import React from 'react';
import { render, screen } from '@testing-library/react';
import DigitButton from './DigitButton';

describe('DigitButton test', () => {
  it('renders DigitButton with digit 1', () => {
    render(<DigitButton digit='1' />);
    const linkElement = screen.getByText(/1/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('renders DigitButton with digit 2', () => {
    render(<DigitButton digit='2' />);
    const linkElement = screen.getByText(/2/i);
    expect(linkElement).toBeInTheDocument();
  });
});
