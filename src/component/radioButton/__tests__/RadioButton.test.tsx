import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { RadioButton } from '../RadioButton';

const mockRadioButtons = ['64-bit(x86)', '64-bit(ARM)'];
const mockSetBits = jest.fn();

afterEach(cleanup);

describe('Testing the Radio Button', () => {
    test('Testing if the Radio button rendering correctly', () => {
        const { getByText } = render(
            <RadioButton radioButtons={mockRadioButtons} buttonItem={1} setBits={mockSetBits} />,
        );
        mockRadioButtons.forEach((button) => expect(getByText(button)).toBeInTheDocument());
    });
    test('Test if the toggle works fine in Radio Buton', () => {
        const { getByText } = render(
            <RadioButton radioButtons={mockRadioButtons} buttonItem={1} setBits={mockSetBits} />,
        );
        const radioButtonElement = getByText(mockRadioButtons[1]);
        fireEvent.click(radioButtonElement);
        expect(mockSetBits).toBeCalled();
    });
});
