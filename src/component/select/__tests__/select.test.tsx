import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import Select from '../select';

const regions = [
    { label: 'us-east-1', value: 1 },
    { label: 'us-east-2', value: 2 },
    { label: 'us-west-1', value: 3 },
    { label: 'india-1', value: 4 },
];

const mockSetRegion = jest.fn();
const mockSetImage = jest.fn();

afterEach(cleanup);

describe('Testing our Select component', () => {
    test('If component renders without crashing', () => {
        const { getByText, getByAltText } = render(
            <Select
                key={regions[0].label}
                options={regions}
                default={regions[0]}
                activeTab={1}
                setRegion={mockSetRegion}
                setImage={mockSetImage}
                image={1}
                disabled={false}
            />,
        );
        const controlElement = getByText(regions[0].label);
        const dropdownIndicator = getByAltText('dropdown indicator down');
        expect(controlElement).toBeInTheDocument();
        expect(dropdownIndicator).toBeInTheDocument();
    });

    test('If menu shows up on clicking the select control', () => {
        const { getByRole } = render(
            <Select
                key={regions[0].label}
                options={regions}
                default={regions[0]}
                activeTab={1}
                setRegion={mockSetRegion}
                setImage={mockSetImage}
                image={1}
                disabled={false}
            />,
        );
        const controlElement = getByRole('button');
        fireEvent.click(controlElement);

        const menuList = getByRole('menu');
        const dropdownIndicator = getByRole('img');
        expect(dropdownIndicator).toHaveAttribute('alt', 'dropdown indicator up');
        expect(menuList).toBeInTheDocument();

        fireEvent.click(controlElement);
        expect(dropdownIndicator).toHaveAttribute('alt', 'dropdown indicator down');
        expect(menuList).not.toBeInTheDocument();
    });

    test('if our options are rendered correctly', () => {
        const { getByRole, getAllByRole } = render(
            <Select
                key={regions[0].label}
                options={regions}
                default={regions[0]}
                activeTab={1}
                setRegion={mockSetRegion}
                setImage={mockSetImage}
                image={1}
                disabled={false}
            />,
        );
        const controlElement = getByRole('button');
        fireEvent.click(controlElement);

        const menuOptions = getAllByRole('option');
        expect(menuOptions).toHaveLength(regions.length);
    });

    test('If the rendered options are correct', () => {
        const { getByRole, getAllByText } = render(
            <Select
                key={regions[0].label}
                options={regions}
                default={regions[0]}
                activeTab={1}
                setRegion={mockSetRegion}
                setImage={mockSetImage}
                image={1}
                disabled={false}
            />,
        );
        const controlElement = getByRole('button');
        fireEvent.click(controlElement);

        regions.forEach(({ label, value }) => expect(getAllByText(label)[0]).toBeVisible());
    });

    // test('If selecting an option working', () => {
    //     const { getByRole, getByText } = render(
    //         <Select
    //             key={regions[0].label}
    //             options={regions}
    //             default={regions[0]}
    //             activeTab={1}
    //             setRegion={mockSetRegion}
    //             setImage={mockSetImage}
    //             image={1}
    //             disabled={false}
    //         />,
    //     );
    //     const controlElement = getByRole('button');
    //     fireEvent.click(controlElement);

    //     const menuList = getByRole('menu');
    //     fireEvent.click(getByText(regions[1].label));
    //     wait(() => expect(controlElement).toHaveTextContent(regions[1].label));
    // });
});
