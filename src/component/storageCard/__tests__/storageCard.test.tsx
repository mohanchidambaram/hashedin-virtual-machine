import * as React from 'react';
import { render, fireEvent, cleanup, wait, getByRole } from '@testing-library/react';
import { StorageCard, StorageCardItemInterface } from '../storageCard';

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

const addStorageCardItem = jest.fn((x: StorageCardItemInterface[]) => x);

afterEach(cleanup);

describe('Testing the Storage Card component in the Storage and Network Tab', () => {
    test('Testing if all the components in the storage card renders perfectly and default value loads', () => {
        const { getByText, getByRole, getAllByRole } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const selectElement = getByText(storageTypeItems[0].label);
        const volumeLabelElemet = getByText(storageCards[0].volume);
        const capacityInputElement = getByRole('spinbutton');
        const remarksInputElement = getByRole('textbox');
        const checkBoxElement = getAllByRole('checkbox');
        const iopsLabelElemet = getByText(storageCards[0].iops);
        expect(selectElement).toBeInTheDocument();
        expect(volumeLabelElemet).toBeInTheDocument();
        expect(capacityInputElement).toBeInTheDocument();
        expect(iopsLabelElemet).toBeInTheDocument();
        expect(remarksInputElement).toBeInTheDocument();
        expect(checkBoxElement).toHaveLength(2);
        expect(checkBoxElement[0]).toBeChecked();
        expect(checkBoxElement[1]).toBeChecked();
    });
    test('Testing the component in the review tab to have specific attributes', () => {
        const { getByRole, getAllByRole } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={5}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const capacityInputElement = getByRole('spinbutton');
        const remarksInputElement = getByRole('textbox');
        const checkBoxElement = getAllByRole('checkbox');
        expect(capacityInputElement).toHaveAttribute('disabled');
        expect(remarksInputElement).toHaveAttribute('disabled');
        expect(checkBoxElement[0]).toHaveAttribute('disabled');
        expect(checkBoxElement[1]).toHaveAttribute('disabled');
    });
    test('Testing if the checkBox Event works', () => {
        const { getAllByRole } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const checkBoxElement = getAllByRole('checkbox');
        fireEvent.click(checkBoxElement[0] || checkBoxElement[1]);
        wait(() => expect(addStorageCardItem).toBeCalled());
    });
    test('Testing if the checkBox Event works', () => {
        const { getAllByRole } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const checkBoxElement = getAllByRole('checkbox');
        fireEvent.click(checkBoxElement[0] || checkBoxElement[1]);
        wait(() => expect(checkBoxElement).not.toBeChecked());
    });
    test('Testing if the capacity input change Event works', () => {
        const { getByRole } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const capacityInputElement = getByRole('spinbutton');
        fireEvent.change(capacityInputElement, { target: { value: 300 } });
        let value = storageCards;
        value[0].capacity = 300;
        wait(() => expect(addStorageCardItem).toBeCalledWith(value));
    });
    test('Testing if the remarks input change Event works', () => {
        const { getByRole } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const remarksInputElement = getByRole('textbox');
        fireEvent.change(remarksInputElement, { target: { value: 'New Remarks' } });
        let value = storageCards;
        value[0].remarks = 'New Remarks';
        wait(() => expect(addStorageCardItem).toBeCalledWith(value));
    });
    test('Testing if the iops updated on capacity change', () => {
        const { getByRole, getByText } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={storageCards}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const capacityInputElement = getByRole('spinbutton');
        fireEvent.change(capacityInputElement, { target: { value: 511 } });
        wait(() => {
            const iopsLabelElemet = getByText('1000');
            expect(iopsLabelElemet).toBeInTheDocument();
            expect(addStorageCardItem).toBeCalled();
        });
    });

    test('Testing if the close Button renders correctly in the storage card', () => {
        let value = storageCards;
        value.push(storageCards[0]);
        const { getByAltText } = render(
            <StorageCard
                key={storageCards.length}
                storageCards={value}
                activeTab={3}
                typeItems={storageTypeItems}
                addStorageCard={addStorageCardItem}
            />,
        );
        const closeButtonElement = getByAltText('close');
        expect(closeButtonElement).toBeInTheDocument();
        fireEvent.click(closeButtonElement);
        wait(() => expect(addStorageCardItem).toBeCalledWith(storageCards));
    });
});
