import React from 'react';
import './RangeSlider.css';

interface RangeSliderPropsInterface {
    bandwidth: number;
    setBandwidth: any;
    selectedInstanceType: number;
}
export const RangeSlider: React.FC<RangeSliderPropsInterface> = (props: RangeSliderPropsInterface) => {
    return (
        <div className="RangeSlider">
            <input
                type="range"
                role="slider"
                min={512}
                max={props.selectedInstanceType === 4 ? 2000 : 1000}
                value={props.bandwidth}
                onChange={({ target: { value: radius } }) => props.setBandwidth(radius)}
            ></input>
            <div className="buble">{props.bandwidth}</div>
        </div>
    );
};
