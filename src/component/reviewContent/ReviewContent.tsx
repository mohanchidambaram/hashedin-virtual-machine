import React from 'react';
import './ReviewContent.css';
import { ImageCardInterface, ImageCard } from '../imageCard/imageCard';
import { StorageCardItemInterface, StorageCard } from '../storageCard/storageCard';
import { SelectOptionInterface } from '../select/select';

export interface ReviewContentPropsInterface {
    imageCard: ImageCardInterface;
    region: number;
    setImage: any;
    setBits: any;
    bits: string;
    activeTab: number;
    instanceType: string;
    core: string;
    memory: string;
    bandwidth: number;
    storageCards: StorageCardItemInterface[];
    typeItems: SelectOptionInterface[];
    setActiveTab: any;
}
export const ReviewContent: React.FC<ReviewContentPropsInterface> = (props: ReviewContentPropsInterface) => {
    const imageCard = props.imageCard;
    if (imageCard.bitItems.length !== 1) {
        imageCard.bitItems = [props.bits];
    }
    const imageCardList: ImageCardInterface[] = [];
    imageCardList.push(imageCard);

    const addStorageCard = (storageCardList: StorageCardItemInterface[]): void => {
        console.log('loadedSuccessfully');
    };

    return (
        <div className="ReviewContent">
            <div className="Json-div">
                <button className="proceed-button">Generate Json</button>
            </div>
            <div className="ImageTabContent">
                <div className="header-div">
                    <h3 className="header">Image</h3>
                    <button className="Edit-button" onClick={() => props.setActiveTab(1)}>
                        Edit
                    </button>
                </div>
                <ImageCard
                    imageCards={imageCardList}
                    region={props.region}
                    setImage={props.setImage}
                    setBits={props.setBits}
                    activeTab={props.activeTab}
                />
            </div>
            <div className="InstanceTypeContent">
                <div className="header-div">
                    <h3 className="header">Instance</h3>
                    <button className="Edit-button" onClick={() => props.setActiveTab(2)}>
                        Edit
                    </button>
                </div>
                <div className="Instance-info-card">
                    <h3>{props.instanceType}</h3>
                    <div className="Inner-instance-info-card">
                        <label>{props.core} CPU</label>
                        <label>512Gb Storage</label>
                    </div>
                    <label>{props.memory}</label>
                    <label>Moderate Network Performance</label>
                </div>
            </div>
            <div className="BandwidthContent">
                <div className="header-div">
                    <h3 className="header">Bandwidth</h3>
                    <button className="Edit-button" onClick={() => props.setActiveTab(3)}>
                        Edit
                    </button>
                </div>
                <div className="Bandwidth-info-card">
                    <h3 className="bandWidth-info">{props.bandwidth} GB</h3>
                    <h3> / Month</h3>
                </div>
            </div>
            <div className="StorageContent">
                <div className="header-div">
                    <h3 className="header">Storage</h3>
                    <button className="Edit-button" onClick={() => props.setActiveTab(3)}>
                        Edit
                    </button>
                </div>
                <StorageCard
                    key={props.storageCards.length}
                    storageCards={props.storageCards}
                    activeTab={props.activeTab}
                    typeItems={props.typeItems}
                    addStorageCard={addStorageCard}
                />
            </div>
        </div>
    );
};
