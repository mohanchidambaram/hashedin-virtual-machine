import React from 'react';
import './RadioButton.css';

export interface RadioButtonPropsInterface {
    radioButtons: string[];
    buttonItem: number;
    setBits: any;
}

export interface RadioButtonInterface {
    index: number;
    value: number;
    label: string;
    setBits: any;
}

export const RadioButton: React.FC<RadioButtonPropsInterface> = (props: RadioButtonPropsInterface) => {
    const radioButtons: string[] = props.radioButtons;

    return (
        <div className="RadioButton">
            <ul className="RadioButton-list">
                {radioButtons.map((radioButton: string, index) => (
                    <RadioButtonItem
                        key={index}
                        index={index}
                        value={props.buttonItem}
                        label={radioButton}
                        setBits={props.setBits}
                    />
                ))}
            </ul>
        </div>
    );
};

const RadioButtonItem: React.FC<RadioButtonInterface> = (props: RadioButtonInterface) => {
    const value: string = props.value.toString();
    return (
        <label>
            <div>
                <input
                    type="radio"
                    value={props.value}
                    name={value}
                    defaultChecked={props.index == 0}
                    onClick={() => props.setBits(props.label)}
                ></input>
                {props.label}
            </div>
        </label>
    );
};
