import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { InstanceLayout } from '../InstanceLayout';

const memoryValues = [
    ['256MB', '512MB', '1GB', '2GB', '4GB'],
    ['16GB', '32GB', '64GB'],
    ['256MB', '512MB', '1GB', '2GB', '4GB', '16GB', '32GB', '64GB'],
];
const coreValues = [
    ['1 Core', '2 Core', '4 Core'],
    ['1 Core', '8 Core', '16 Core'],
    ['1 Core', '2 Core', '8 Core', '16 Core'],
    ['1 Core', '2 Core', '4 Core', '8 Core', '16 Core'],
];
const instanceTypeCards = [
    { id: 1, type: 'General Purpose', memory: 0, cpu: 0 },
    { id: 2, type: 'Storage Optimized', memory: 1, cpu: 1 },
    { id: 3, type: 'CPU Optimized', memory: 1, cpu: 2 },
    { id: 4, type: 'Network Optimized', memory: 2, cpu: 3 },
];

const defaultCore = { value: 0, label: coreValues[0][0] };
const defaultMemory = { value: 0, label: memoryValues[0][0] };
const setInstanceType = jest.fn();
const setCore = jest.fn();
const setMemory = jest.fn();
const setBandwidth = jest.fn();

afterEach(cleanup);

describe('Testing the Image Instance Tab Components', () => {
    test('Testing if Instance type card renders correctly', () => {
        const { getByText, getAllByRole } = render(
            <InstanceLayout
                activeTab={2}
                instanceTypeCards={instanceTypeCards}
                instanceType={1}
                setInstanceType={setInstanceType}
                coreItem={defaultCore}
                updateCore={setCore}
                memoryItem={defaultMemory}
                updateMemory={setMemory}
                bandwidth={512}
                setBandwidth={setBandwidth}
            ></InstanceLayout>,
        );
        const buttonElements = getAllByRole('button');
        expect(buttonElements).toHaveLength(instanceTypeCards.length + 2);
        instanceTypeCards.forEach(({ type }) => expect(getByText(type)).toBeInTheDocument());
    });

    test('Testing if the default value is loaded in Single selects', () => {
        const { getByText } = render(
            <InstanceLayout
                activeTab={2}
                instanceTypeCards={instanceTypeCards}
                instanceType={1}
                setInstanceType={setInstanceType}
                coreItem={defaultCore}
                updateCore={setCore}
                memoryItem={defaultMemory}
                updateMemory={setMemory}
                bandwidth={512}
                setBandwidth={setBandwidth}
            ></InstanceLayout>,
        );
        const memorySelectElement = getByText(memoryValues[0][0]);
        const coreSelectElement = getByText(memoryValues[0][0]);
        expect(memorySelectElement).toBeInTheDocument();
        expect(coreSelectElement).toBeInTheDocument();
    });

    test('Testing if the instance change works in Instance Tab', () => {
        const { getByText } = render(
            <InstanceLayout
                activeTab={2}
                instanceTypeCards={instanceTypeCards}
                instanceType={1}
                setInstanceType={setInstanceType}
                coreItem={defaultCore}
                updateCore={setCore}
                memoryItem={defaultMemory}
                updateMemory={setMemory}
                bandwidth={512}
                setBandwidth={setBandwidth}
            ></InstanceLayout>,
        );
        const instanceTypeElement = getByText(instanceTypeCards[3].type);
        fireEvent.click(instanceTypeElement);
        expect(setInstanceType).toBeCalled();
    });

    test('Testing if the Error handling works in Instance Tab', () => {
        const { getByText } = render(
            <InstanceLayout
                activeTab={2}
                instanceTypeCards={instanceTypeCards}
                instanceType={1}
                setInstanceType={setInstanceType}
                coreItem={defaultCore}
                updateCore={setCore}
                memoryItem={defaultMemory}
                updateMemory={setMemory}
                bandwidth={512}
                setBandwidth={setBandwidth}
            ></InstanceLayout>,
        );
        const instanceTypeElement = getByText(instanceTypeCards[2].type);
        fireEvent.click(instanceTypeElement);
        expect(setInstanceType).not.toBeCalled();
    });
});
