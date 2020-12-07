import React from 'react';
import chevronDown from '../../assets/images/down.svg';
import chevronUp from '../../assets/images/up.svg';
import './select.css';
import { ErrorMessageDialog } from '../errorMessageDialog/ErrorMessageDialog';

interface SelectPropsInterface {
    key: string;
    options: SelectOptionInterface[];
    default: SelectOptionInterface;
    setRegion: any;
    activeTab: number;
    image?: number;
    setImage?: any;
    capacity?: number;
    setCapacity?: any;
    disabled: boolean;
}

export interface SelectOptionInterface {
    label: string;
    value: number;
}

interface SelectMenuOptionInterface {
    option: SelectOptionInterface;
    onSelect: (option: SelectOptionInterface) => void;
}

const Select: React.FC<SelectPropsInterface> = (props: SelectPropsInterface) => {
    const { options } = props;
    const [selectedOption, setSelectedOption] = React.useState<SelectOptionInterface>(props.default);
    const [tempSelectedOption, setTempSelectedOption] = React.useState<SelectOptionInterface>(selectedOption);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isErrorProceed, setIsErrorProceed] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const [message, setMessage] = React.useState('If you proceed you may lose data');
    const onOptionSelect = (option: SelectOptionInterface): void => {
        const isStorageError =
            props.activeTab === 3 &&
            props.capacity &&
            ((option.value === 1 && props.capacity > 512) || (option.value == 0 && props.capacity < 40));
        if (isStorageError) {
            setMessage(`${props.capacity} MB is not available for ${option.label}`);
            setTempSelectedOption(option);
            setIsError(!isError);
        } else if (props.activeTab === 1 && props.image == 4 && option.value >= 2) {
            setMessage('Windows is only available in us-east-1 and us-east-2. If you proceed you may lose data');
            setTempSelectedOption(option);
            setIsError(!isError);
        } else {
            setSelectedOption(option);
            setIsMenuOpen(false);
            props.setRegion(option.value);
        }
    };

    React.useEffect(() => {
        const clickHandler = () => (isMenuOpen ? setIsMenuOpen(false) : null);
        document.addEventListener('click', clickHandler);

        return () => document.removeEventListener('click', clickHandler);
    });

    React.useEffect(() => {
        if (isErrorProceed) {
            setIsError(false);
            setIsErrorProceed(false);
            setSelectedOption(tempSelectedOption);
            setIsMenuOpen(false);
            if (props.activeTab === 1) {
                props.setRegion(tempSelectedOption.value);
                props.setImage(1);
            } else if (props.activeTab === 3 && props.capacity) {
                props.setRegion(tempSelectedOption.value);
                props.setCapacity(props.capacity < 40 ? 40 : 512);
            }
        }
    }, [isErrorProceed]);

    return (
        <div>
            <div className="Select">
                <button
                    className="drop-down-button"
                    disabled={props.disabled}
                    onClick={(): void => setIsMenuOpen((state) => !state)}
                >
                    <div className="drop-down-button-label">{selectedOption.label}</div>
                    <span className="dropdown-indicator">
                        <img
                            src={isMenuOpen ? chevronUp : chevronDown}
                            alt={`dropdown indicator ${isMenuOpen ? 'up' : 'down'}`}
                        />
                    </span>
                </button>
                {isMenuOpen && (
                    <div className="drop-down-menu">
                        <ul className="drop-down-menu-list" role="menu">
                            {options.map((option: SelectOptionInterface) => (
                                <SelectMenuOption option={option} key={option.value} onSelect={onOptionSelect} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="ErrorMessageDialog">
                {isError ? (
                    <ErrorMessageDialog
                        message={message}
                        setIsError={setIsError}
                        setIsErrorProceed={setIsErrorProceed}
                    />
                ) : null}
            </div>
        </div>
    );
};
export default Select;

const SelectMenuOption: React.FC<SelectMenuOptionInterface> = (props: SelectMenuOptionInterface) => {
    const { option, onSelect } = props;

    const onItemClick = (): void => onSelect(option);

    return (
        <li className="menu-list-item" onClick={onItemClick} role="option" aria-selected="true">
            {option.label}
        </li>
    );
};
