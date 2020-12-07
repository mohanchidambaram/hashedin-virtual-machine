import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { ReviewContent } from '../ReviewContent';
import { StorageCardItemInterface } from '../../storageCard/storageCard';
import { ImageCardInterface } from '../../imageCard/imageCard';

const instanceTypeCards = [
    { id: 1, type: 'General Purpose', memory: 0, cpu: 0 },
    { id: 2, type: 'Storage Optimized', memory: 1, cpu: 1 },
    { id: 3, type: 'CPU Optimized', memory: 1, cpu: 2 },
    { id: 4, type: 'Network Optimized', memory: 2, cpu: 3 },
];

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

const image: ImageCardInterface = {
    id: 1,
    title: 'Linux 2 Image',
    description: 'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
    bitItems: ['64-bit(x86)', '64-bit(ARM)'],
    price: 243.61,
    region: 4,
};

const setBits = jest.fn();
const setImage = jest.fn();
const setActiveTab = jest.fn((x: number) => x);

afterEach(cleanup);

describe('Testing the Review Tab', () => {
    test('Testing if all the elements rendered correctly', () => {
        const { getByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const jsonbuttonElement = getByText('Generate Json');
        const imageHeaderElement = getByText('Image');
        const instanceHeaderElement = getByText('Instance');
        const bandwidthHeaderElement = getByText('Bandwidth');
        const storageHeaderElement = getByText('Storage');
        expect(jsonbuttonElement).toBeInTheDocument();
        expect(imageHeaderElement).toBeInTheDocument();
        expect(instanceHeaderElement).toBeInTheDocument();
        expect(bandwidthHeaderElement).toBeInTheDocument();
        expect(storageHeaderElement).toBeInTheDocument();
    });
    test('Testing if the rendered informations are correct', () => {
        const { getByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const titleElement = getByText(image.title);
        const descriptionElement = getByText(image.description);
        const bitsElement = getByText(image.bitItems[0]);
        const instanceTypeElement = getByText(instanceTypeCards[0].type);
        const storageTypeElement = getByText(storageCards[0].type.label);
        const volumeElement = getByText(storageCards[0].volume);
        expect(titleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(bitsElement).toBeInTheDocument();
        expect(instanceTypeElement).toBeInTheDocument();
        expect(storageTypeElement).toBeInTheDocument();
        expect(volumeElement).toBeInTheDocument();
    });
    test('Testing if Edit button renders correctly in Review Tab', () => {
        const { getAllByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const editButtonElements = getAllByText('Edit');
        expect(editButtonElements[0]).toBeInTheDocument();
    });
    test('Edit button functionality in Review Tab', () => {
        const { getAllByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const editButtonElements = getAllByText('Edit');
        fireEvent.click(editButtonElements[0]);
        expect(setActiveTab).toBeCalledWith(1);
    });
    test('Edit button functionality in Review Tab', () => {
        const { getAllByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const editButtonElements = getAllByText('Edit');
        fireEvent.click(editButtonElements[1]);
        expect(setActiveTab).toBeCalledWith(2);
    });
    test('Edit button functionality in Review Tab', () => {
        const { getAllByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const editButtonElements = getAllByText('Edit');
        fireEvent.click(editButtonElements[2]);
        expect(setActiveTab).toBeCalledWith(3);
    });
    test('Edit button functionality in Review Tab', () => {
        const { getAllByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const editButtonElements = getAllByText('Edit');
        fireEvent.click(editButtonElements[3]);
        expect(setActiveTab).toBeCalledWith(3);
    });
    test('Testing if the headers are rendered properly', () => {
        const { getByText } = render(
            <ReviewContent
                key="1"
                imageCard={image}
                setBits={setBits}
                setImage={setImage}
                region={1}
                bits={image.bitItems[0]}
                activeTab={5}
                instanceType={instanceTypeCards[0].type}
                core={'1 Core'}
                memory={'256MB'}
                bandwidth={512}
                typeItems={storageTypeItems}
                storageCards={storageCards}
                setActiveTab={setActiveTab}
            ></ReviewContent>,
        );
        const imageHeaderElements = getByText('Image');
        const instanceHeaderElements = getByText('Instance');
        const bandwidthHeaderElements = getByText('Bandwidth');
        const storageHeaderElements = getByText('Storage');
        expect(imageHeaderElements).toBeInTheDocument();
        expect(instanceHeaderElements).toBeInTheDocument();
        expect(bandwidthHeaderElements).toBeInTheDocument();
        expect(storageHeaderElements).toBeInTheDocument();
    });
});
