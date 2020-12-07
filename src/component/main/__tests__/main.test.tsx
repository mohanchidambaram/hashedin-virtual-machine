import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import Main from '../main';

afterEach(cleanup);

const image = {
    id: 1,
    title: 'Linux 2 Image',
    description: 'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
    bitItems: ['64-bit(x86)', '64-bit(ARM)'],
    price: 243.61,
    region: 4,
};

describe('Testing the Main Page Components', () => {
    test('Testing if all the components are rendered', () => {
        const { getByText } = render(<Main />);
        const headerElement = getByText('Choose Image');
        const costDetailElement = getByText('Cost Estimates');
        const proceedButton = getByText('Proceed');
        expect(headerElement).toBeInTheDocument();
        expect(costDetailElement).toBeInTheDocument();
        expect(proceedButton).toBeInTheDocument();
    });

    test('Testing the tab navigation', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        const backButton = getByText('Back');
        expect(backButton).toBeInTheDocument();
        const headerElement = getByText('Choose Instance Type');
        expect(headerElement).toBeInTheDocument();
    });
    test('Testing the Price details', () => {
        const { getByText } = render(<Main />);
        const imageCostElement = getByText('$243.61');
        expect(imageCostElement).toBeInTheDocument();
    });
    test('Testing the Price detail update functionality', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        const bandWidthCostElement = getByText('$5.00');
        expect(bandWidthCostElement).toBeInTheDocument();
    });
    test('Testing the Back button functionality', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        const backButton = getByText('Back');
        fireEvent.click(backButton);
        const headerElement = getByText('Choose Image');
        expect(headerElement).toBeInTheDocument();
    });
    test('Testing the Cancel button functionality', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        const cancelButton = getByText('Cancel');
        fireEvent.click(cancelButton);
        const headerElement = getByText('Choose Image');
        expect(headerElement).toBeInTheDocument();
    });
    test('Testing if the proceed button changes to Launch in last tab', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        const launchButtonElement = getByText('Launch');
        expect(launchButtonElement).toBeInTheDocument();
    });
    test('Testing all components renders in the image tab', () => {
        const { getByText, getAllByText } = render(<Main />);
        const headerElement = getByText('Choose Image');
        expect(headerElement).toBeInTheDocument();
        const titleElement = getAllByText(image.title);
        expect(titleElement[0]).toBeInTheDocument();
        const descElement = getAllByText(image.description);
        expect(descElement).toHaveLength(5);
        const bitsElement = getAllByText(image.bitItems[0]);
        expect(bitsElement[0]).toBeInTheDocument();
        const selectElement = getAllByText('Select');
        expect(selectElement[0]).toBeInTheDocument();
    });
    test('Testing all components renders in the instance tab', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        const headerElement = getByText('Choose Instance Type');
        expect(headerElement).toBeInTheDocument();
        const memoryElement = getByText('256MB');
        expect(memoryElement).toBeInTheDocument();
        const coreElement = getByText('1 Core');
        expect(coreElement).toBeInTheDocument();
        const instanceTypeElement = getByText('General Purpose');
        expect(instanceTypeElement).toBeInTheDocument();
    });
    test('Testing all components renders in the storage tab', () => {
        const { getByText, getByRole, getAllByRole } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        const headerElement = getByText('Choose Storage and Network');
        expect(headerElement).toBeInTheDocument();
        const capacityInputElement = getByRole('spinbutton');
        expect(capacityInputElement).toBeInTheDocument();
        const remarksInputElement = getByRole('textbox');
        expect(remarksInputElement).toBeInTheDocument();
        const selectElement = getByText('Magnetic Disks');
        expect(selectElement).toBeInTheDocument();
        const checkBoxElement = getAllByRole('checkbox');
        expect(checkBoxElement).toHaveLength(2);
    });
    test('Testing all components renders in the security tab', () => {
        const { getByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        const headerElement = getByText('Configure Security');
        const subElemet = getByText(
            'Security Configuration is still under Development, But Dont worry, You will be provided with high level security configured at free of cost.',
        );
        expect(headerElement).toBeInTheDocument();
    });
    test('Testing all components renders in the review tab', () => {
        const { getByText, getByRole, getAllByRole, getAllByText } = render(<Main />);
        const proceedButton = getByText('Proceed');
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        fireEvent.click(proceedButton);
        const launchButton = getByText('Launch');
        expect(launchButton).toBeInTheDocument();
        const jsonButton = getByText('Generate Json');
        expect(jsonButton).toBeInTheDocument();
        const cancelButton = getByText('Cancel');
        expect(cancelButton).toBeInTheDocument();
        const headerElement = getByText('Review & Launch');
        expect(headerElement).toBeInTheDocument();
        const titleElement = getAllByText(image.title);
        expect(titleElement[0]).toBeInTheDocument();
        const memoryElement = getByText('256MB');
        expect(memoryElement).toBeInTheDocument();
        const instanceTypeElement = getByText('General Purpose');
        expect(instanceTypeElement).toBeInTheDocument();
        const capacityInputElement = getByRole('spinbutton');
        expect(capacityInputElement).toBeInTheDocument();
        expect(capacityInputElement).toHaveAttribute('disabled');
        const remarksInputElement = getByRole('textbox');
        expect(remarksInputElement).toBeInTheDocument();
        expect(remarksInputElement).toHaveAttribute('disabled');
        const selectElement = getByText('Magnetic Disks');
        expect(selectElement).toBeInTheDocument();
        const checkBoxElement = getAllByRole('checkbox');
        expect(checkBoxElement).toHaveLength(2);
        expect(checkBoxElement[0]).toHaveAttribute('disabled');
    });
});
