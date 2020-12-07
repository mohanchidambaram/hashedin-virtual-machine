import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { ImageCard, ImageCardInterface } from '../imageCard';

const cardImageItems: ImageCardInterface[] = [
    {
        id: 1,
        title: 'Linux 2 Image',
        description:
            'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
        bitItems: ['64-bit(x86)', '64-bit(ARM)'],
        price: 243.61,
        region: 4,
    },
    {
        id: 2,
        title: 'Ubuntu Server 18.04 LTS',
        description:
            'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
        bitItems: ['64-bit(x86)', '64-bit(ARM)'],
        price: 243.61,
        region: 4,
    },
];

const setImage = jest.fn();
const setBits = jest.fn();

afterEach(cleanup);

describe('Testing the Image card Component in the Choose Image Tab', () => {
    test('Testing if the component is rendered perfectly', () => {
        const { getByText, getAllByRole, getAllByText } = render(
            <ImageCard imageCards={cardImageItems} region={1} activeTab={1} setImage={setBits} setBits={setBits} />,
        );
        const selectbuttonElement = getAllByRole('button');
        const labelElement = getByText(cardImageItems[0].title);
        const descriptionElement = getAllByText(cardImageItems[0].description);
        const radioButtonElement = getAllByText(cardImageItems[0].bitItems[0]);
        expect(selectbuttonElement).toHaveLength(cardImageItems.length);
        expect(labelElement).toBeInTheDocument();
        expect(descriptionElement).toHaveLength(cardImageItems.length);
        expect(radioButtonElement).toHaveLength(cardImageItems.length);
    });

    test('Testing the Select button functionality', () => {
        const { getAllByRole } = render(
            <ImageCard imageCards={cardImageItems} region={1} activeTab={1} setImage={setImage} setBits={setBits} />,
        );
        const selectbuttonElement = getAllByRole('button');
        fireEvent.click(selectbuttonElement[0]);
        expect(setImage).toBeCalled();
    });

    test('Testing the Radio button functionality', () => {
        const { getAllByText } = render(
            <ImageCard imageCards={cardImageItems} region={1} activeTab={1} setImage={setImage} setBits={setBits} />,
        );
        const radiobuttonElement = getAllByText(cardImageItems[0].bitItems[0]);
        fireEvent.click(radiobuttonElement[0]);
        expect(setBits).toBeCalled();
    });
});
