import * as React from 'react';
import { render, fireEvent, cleanup, wait, getByRole } from '@testing-library/react';
import { StorageNetworkLayout } from '../StorageNetworkLayout';
import { StorageCardItemInterface } from '../../storageCard/storageCard';

const storageTypeItems = [
    { label: 'Magnetic Disks', value: 0 },
    { label: 'SSD', value: 1 },
];
const storageCards: StorageCardItemInterface[] = [
    {
        type: { label: 'Magnetic Disks', value: 0 },
        volume: 'Root',
        capacity: 120,
        isEncryption: true,
        iops: 600,
        isBackupRequired: true,
        remarks: 'Some Remarks',
    },
];
const defaultAdditionalCard: StorageCardItemInterface = {
    type: { label: 'Magnetic Disks', value: 0 },
    volume: 'Ext',
    capacity: 120,
    isEncryption: true,
    iops: 600,
    isBackupRequired: true,
    remarks: 'Some Remarks',
};

const addStorageCard = jest.fn((x: StorageCardItemInterface[]) => x);
const setBandwidth = jest.fn();

afterEach(cleanup);

describe('Testing the Storage and Network Tab Components', () => {
    test('Testing if the components renders correctly in the Storage and Network Tab', () => {
        const { getByText } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={storageCards}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const addVolumeButtonElement = getByText('Add Volume');
        expect(addVolumeButtonElement).toBeInTheDocument();
        const bandwidthConfigElement = getByText('Network Bandwidth Configuration');
        expect(bandwidthConfigElement).toBeInTheDocument();
    });
    test('Testing if the label is correct in the Storage and Network Tab', () => {
        const { getByText } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={storageCards}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const labelElement = getByText('Outbound Traffic (GB)');
        expect(labelElement).toBeInTheDocument();
    });
    test('Testing if the Storage Card loaded in the Storage and Network Tab', () => {
        const { getByRole, getByText, getAllByRole } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={storageCards}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const capacityInputElement = getByRole('spinbutton');
        expect(capacityInputElement).toBeInTheDocument();
        const remarksInputElement = getByRole('textbox');
        expect(remarksInputElement).toBeInTheDocument();
        const selectElement = getByText(storageTypeItems[0].label);
        expect(selectElement).toBeInTheDocument();
        const checkBoxElement = getAllByRole('checkbox');
        expect(checkBoxElement).toHaveLength(2);
    });
    test('Testing if the Additional Card added in the Storage and Network Tab', () => {
        let value = storageCards;
        value.push(defaultAdditionalCard);
        const { getByRole, getAllByText, getAllByRole } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={value}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const capacityInputElement = getAllByRole('spinbutton');
        expect(capacityInputElement).toHaveLength(2);
        const remarksInputElement = getAllByRole('textbox');
        expect(remarksInputElement).toHaveLength(2);
        const selectElement = getAllByText(storageTypeItems[0].label);
        expect(selectElement).toHaveLength(2);
        const checkBoxElement = getAllByRole('checkbox');
        expect(checkBoxElement).toHaveLength(4);
    });
    test('Testing if the Additional Card added have Ext volume and close button added in Storage and Network Tab', () => {
        const { getByAltText, getByText } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={storageCards}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const volumeLabelElemet = getByText(storageCards[0].volume);
        expect(volumeLabelElemet).toBeInTheDocument();
        const closeButtonElement = getByAltText('close');
        expect(closeButtonElement).toBeInTheDocument();
    });
    test('Testing if the Slider renders correctly', () => {
        const { getByRole } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={storageCards}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const sliderElement = getByRole('slider');
        expect(sliderElement).toBeInTheDocument();
    });
    test('Add Volume button functionality', () => {
        const { getAllByRole, getAllByAltText } = render(
            <StorageNetworkLayout
                typeItems={storageTypeItems}
                storageCards={storageCards}
                activeTab={3}
                addStorageCard={addStorageCard}
                bandwidth={512}
                setBandwidth={setBandwidth}
                selectedInstanceType={2}
            />,
        );
        const buttonElements = getAllByRole('button');
        expect(buttonElements[3]).toBeInTheDocument();
        fireEvent.click(buttonElements[3]);
        const closeButtonElement = getAllByAltText('close');
        expect(closeButtonElement).toHaveLength(2);
    });
});
