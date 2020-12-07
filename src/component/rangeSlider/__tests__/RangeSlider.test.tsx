import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { RangeSlider } from '../RangeSlider';

const setBandwidth = jest.fn();

afterEach(cleanup);

describe('Testing the Range slider component', () => {
    test('Testing if the Slider renders correctly', () => {
        const { getByRole } = render(
            <RangeSlider bandwidth={512} setBandwidth={setBandwidth} selectedInstanceType={1} />,
        );
        const sliderElement = getByRole('slider');
        expect(sliderElement).toBeInTheDocument();
    });
    test('Testing if the Slider loaded based on the selected instance type', () => {
        const { getByRole } = render(
            <RangeSlider bandwidth={512} setBandwidth={setBandwidth} selectedInstanceType={1} />,
        );
        const sliderElement = getByRole('slider');
        expect(sliderElement).toHaveAttribute('max', '1000');
    });
    test('Testing if the Slider loaded based on the selected instance type', () => {
        const { getByRole } = render(
            <RangeSlider bandwidth={512} setBandwidth={setBandwidth} selectedInstanceType={4} />,
        );
        const sliderElement = getByRole('slider');
        expect(sliderElement).toHaveAttribute('max', '2000');
    });
    test('Testing if the Slider component works correctly', () => {
        const { getByRole } = render(
            <RangeSlider bandwidth={512} setBandwidth={setBandwidth} selectedInstanceType={1} />,
        );
        const sliderElement = getByRole('slider');
        fireEvent.change(sliderElement);
        wait(() => expect(setBandwidth).toBeCalled());
    });
    test('Testing if the Slider loaded with correct minimum bandwidth', () => {
        const { getByRole } = render(
            <RangeSlider bandwidth={512} setBandwidth={setBandwidth} selectedInstanceType={4} />,
        );
        const sliderElement = getByRole('slider');
        expect(sliderElement).toHaveAttribute('min', '512');
    });
    test('Testing if the Slider loaded with correct default bandwidth', () => {
        const { getByRole } = render(
            <RangeSlider bandwidth={857} setBandwidth={setBandwidth} selectedInstanceType={4} />,
        );
        const sliderElement = getByRole('slider');
        expect(sliderElement).toHaveValue('857');
    });
    test('Testing if the selected value displayed correctly', () => {
        const { getByText } = render(
            <RangeSlider bandwidth={857} setBandwidth={setBandwidth} selectedInstanceType={4} />,
        );
        const sliderValueElement = getByText('857');
        expect(sliderValueElement).toBeInTheDocument();
    });
});
