import React from 'react';
import './StorageNetworkLayout.css';
import { StorageCardItemInterface, StorageCard } from '../storageCard/storageCard';
import { SelectOptionInterface } from '../select/select';
import { RangeSlider } from '../rangeSlider/RangeSlider';

interface StorageNetworkPropsInterface {
    storageCards: StorageCardItemInterface[];
    typeItems: SelectOptionInterface[];
    activeTab: number;
    addStorageCard: any;
    bandwidth: number;
    setBandwidth: any;
    selectedInstanceType: number;
}

export const StorageNetworkLayout: React.FC<StorageNetworkPropsInterface> = (props: StorageNetworkPropsInterface) => {
    const [storageCardItems, setStorageCardItems] = React.useState<StorageCardItemInterface[]>(props.storageCards);
    const defaultAdditionalCard: StorageCardItemInterface = {
        type: { label: 'Magnetic Disks', value: 0 },
        volume: 'Ext',
        capacity: 120,
        isEncryption: true,
        iops: 600,
        isBackupRequired: true,
        remarks: 'Some Remarks',
    };
    const addStorageCardItem = (storageCardList: StorageCardItemInterface[]): void => {
        setStorageCardItems(storageCardList);
    };

    React.useEffect(() => {
        props.addStorageCard(storageCardItems);
    }, [storageCardItems]);

    const addVolumeClick = (): void => {
        const temp = storageCardItems.map((storageInformation) => storageInformation);
        temp.push(defaultAdditionalCard);
        setStorageCardItems(temp);
    };

    return (
        <div className="StorageNetworkLayout">
            <div className="Storage-card-div">
                <StorageCard
                    key={storageCardItems.length}
                    storageCards={storageCardItems}
                    activeTab={props.activeTab}
                    typeItems={props.typeItems}
                    addStorageCard={addStorageCardItem}
                />
                <div className="Add-volume-div">
                    <button className="Add-volume-button" onClick={() => addVolumeClick()}>
                        Add Volume
                    </button>
                </div>
            </div>
            <div className="Bandwidth-div">
                <h3>Network Bandwidth Configuration</h3>
                <label>Outbound Traffic (GB)</label>
                <RangeSlider
                    bandwidth={props.bandwidth}
                    setBandwidth={props.setBandwidth}
                    selectedInstanceType={props.selectedInstanceType}
                />
            </div>
        </div>
    );
};
