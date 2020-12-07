import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { Tab } from '../tab';

const tabItems = [
    { id: 1, label: 'Choose Image' },
    { id: 2, label: 'Choose Instance Type' },
    { id: 3, label: 'Choose Storage and Network' },
    { id: 4, label: 'Configure Security' },
    { id: 5, label: 'Review & Launch' },
];

afterEach(cleanup);

describe('Testing the Tab component', () => {
    test('If the Tab Items rendered Correctly', () => {
        const { getByText } = render(<Tab tabItems={tabItems} />);
        tabItems.forEach(({ label, id }) => expect(getByText(id + '. ' + label)).toBeVisible());
    });
});
