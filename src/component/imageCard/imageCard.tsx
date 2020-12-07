import React from 'react';
import './imageCard.css';
import { RadioButtonInterface, RadioButton } from '../radioButton/RadioButton';

export interface ImageCardPropsInterface {
    imageCards: ImageCardInterface[];
    region: number;
    setImage: any;
    setBits: any;
    activeTab: number;
}

export interface ImageCardItemPropsInterface {
    imageCard: ImageCardInterface;
    setImage: any;
    setBits: any;
    activeTab: number;
}

export interface ImageCardInterface {
    id: number;
    title: string;
    description: string;
    bitItems: string[];
    price: number;
    region: number;
}

export const ImageCard: React.FC<ImageCardPropsInterface> = (props: ImageCardPropsInterface) => {
    const imageCards: ImageCardInterface[] = props.imageCards;

    return (
        <div className="Image-card">
            <ul className="Image-card-list">
                {imageCards.map((imageCard: ImageCardInterface) => {
                    return props.region <= imageCard.region ? (
                        <ImageCardItem
                            key={imageCard.id}
                            imageCard={imageCard}
                            setImage={props.setImage}
                            setBits={props.setBits}
                            activeTab={props.activeTab}
                        />
                    ) : null;
                })}
            </ul>
        </div>
    );
};

const ImageCardItem: React.FC<ImageCardItemPropsInterface> = (props: ImageCardItemPropsInterface) => {
    const imageCard: ImageCardInterface = props.imageCard;
    return (
        <div className="ImageCardItem">
            <div className="Image-div">
                <img src="../../assets/images/hashed.jpg" />
            </div>
            <div className="Content-div">
                <h3>{imageCard.title}</h3>
                <label>{imageCard.description}</label>
            </div>
            <div className="Bits-div">
                <RadioButton radioButtons={imageCard.bitItems} buttonItem={imageCard.id} setBits={props.setBits} />
                {props.activeTab === 1 ? (
                    <button
                        className="select-button"
                        onClick={() => {
                            props.setImage(imageCard.id);
                        }}
                    >
                        Select
                    </button>
                ) : null}
            </div>
        </div>
    );
};
