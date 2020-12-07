import * as React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { ErrorMessageDialog } from '../ErrorMessageDialog';

const setIsError = jest.fn();
const setIsErrorProceed = jest.fn();

afterEach(cleanup);

const message = 'Test if the message displayed in the Error Message Dialog';

describe('Testing the Error Message Dialog Component', () => {
    test('Testing if the button renders correctly', () => {
        const { getAllByRole } = render(
            <ErrorMessageDialog message={message} setIsError={setIsError} setIsErrorProceed={setIsErrorProceed} />,
        );
        const buttonComponent = getAllByRole('button');
        expect(buttonComponent).toHaveLength(3);
    });

    test('Testing if the Error message renders correctly', () => {
        const { getByText } = render(
            <ErrorMessageDialog message={message} setIsError={setIsError} setIsErrorProceed={setIsErrorProceed} />,
        );
        const errorMessageComponent = getByText(message);
        expect(errorMessageComponent).toBeInTheDocument();
    });

    test('Testing the proceed button event in the dialog', () => {
        const { getByText } = render(
            <ErrorMessageDialog message={message} setIsError={setIsError} setIsErrorProceed={setIsErrorProceed} />,
        );
        const proceedButtonComponent = getByText('Yes, Proceed');
        fireEvent.click(proceedButtonComponent);
        expect(setIsErrorProceed).toBeCalled();
    });

    test('Testing the cancel button event in the dialog', () => {
        const { getByText } = render(
            <ErrorMessageDialog message={message} setIsError={setIsError} setIsErrorProceed={setIsErrorProceed} />,
        );
        const cancelButtonComponent = getByText('Cancel');
        fireEvent.click(cancelButtonComponent);
        expect(setIsError).toBeCalled();
    });

    test('Testing the close button event in the dialog', () => {
        const { getByAltText } = render(
            <ErrorMessageDialog message={message} setIsError={setIsError} setIsErrorProceed={setIsErrorProceed} />,
        );
        const closeButtonComponent = getByAltText('close');
        fireEvent.click(closeButtonComponent);
        expect(setIsError).toBeCalled();
    });
});
