import React from 'react';
import './ErrorMessageDialog.css';
import close from '../../assets/images/close.svg';

interface ErrorMessageDialogInterface {
    message: string;
    setIsError: any;
    setIsErrorProceed: any;
}

export const ErrorMessageDialog: React.FC<ErrorMessageDialogInterface> = (props: ErrorMessageDialogInterface) => {
    return (
        <div className="ErrorDialogOuter">
            <div className="ErrorDialog">
                <div className="Header">
                    <button className="close-button" onClick={() => props.setIsError(false)}>
                        <span className="close-icon">
                            <img src={close} alt="close" />
                        </span>
                    </button>
                </div>
                <div className="Content">
                    <label>{props.message}</label>
                </div>
                <div className="Footer">
                    <button className="no-button" onClick={() => props.setIsError(false)}>
                        Cancel
                    </button>
                    <button
                        className="yes-button"
                        onClick={() => {
                            props.setIsErrorProceed(true);
                        }}
                    >
                        Yes, Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};
