import React from 'react';
import './storageCard.css';
import Select, { SelectOptionInterface } from '../select/select';
import close from '../../assets/images/close.svg';

interface StorageCardPropsInterface {
    key: number;
    storageCards: StorageCardItemInterface[];
    activeTab: number;
    typeItems: SelectOptionInterface[];
    addStorageCard: any;
}

interface StorageCardItemPropsInterface {
    storageCard: StorageCardItemInterface;
    activeTab: number;
    typeItems: SelectOptionInterface[];
    index: number;
    editStorageCardItem: any;
}

export interface StorageCardItemInterface {
    type: SelectOptionInterface;
    volume: string;
    capacity: number;
    isEncryption: boolean;
    iops: number;
    isBackupRequired: boolean;
    remarks: string;
}

export const StorageCard: React.FC<StorageCardPropsInterface> = (props: StorageCardPropsInterface) => {
    const [storageCardsValues, setStorageCardValues] = React.useState<StorageCardItemInterface[]>(props.storageCards);
    const defaultAdditionalCard: StorageCardItemInterface = {
        type: { label: 'Magnetic Disks', value: 0 },
        volume: 'Ext',
        capacity: 120,
        isEncryption: true,
        iops: 600,
        isBackupRequired: true,
        remarks: 'Some Remarks',
    };
    const editStorageCardItem = (index: number, storageCard: StorageCardItemInterface): void => {
        const temp = storageCardsValues.map((storageInformation, valueIndex) =>
            index === valueIndex ? storageCard : storageInformation,
        );
        setStorageCardValues(temp);
    };

    const removeStorageItem = (index: number): void => {
        const temp = storageCardsValues.filter((storageInformation, valueIndex) => valueIndex !== index);
        setStorageCardValues(temp);
    };

    React.useEffect(() => {
        props.addStorageCard(storageCardsValues);
    }, [storageCardsValues]);

    return (
        <div className="Storage-card">
            <ul className="Storage-card-list">
                {storageCardsValues.map((storageCard: StorageCardItemInterface, index) => {
                    return (
                        <div key={index} className="Inner-storage-card-list">
                            <StorageCardItem
                                key={index}
                                index={index}
                                storageCard={storageCard}
                                activeTab={props.activeTab}
                                typeItems={props.typeItems}
                                editStorageCardItem={editStorageCardItem}
                            />
                            {index !== 0 && props.activeTab !== 5 ? (
                                <button
                                    className="close-button"
                                    onClick={() => {
                                        removeStorageItem(index);
                                    }}
                                >
                                    <span className="close-icon">
                                        <img src={close} alt="close" />
                                    </span>
                                </button>
                            ) : null}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

const StorageCardItem: React.FC<StorageCardItemPropsInterface> = (props: StorageCardItemPropsInterface) => {
    const [storageCard, setStorageCard] = React.useState<StorageCardItemInterface>(props.storageCard);
    const [type, setType] = React.useState(storageCard.type.value);
    const [isEncrypt, setIsEncrypt] = React.useState(storageCard.isEncryption);
    const [isBackup, setIsBackup] = React.useState(storageCard.isBackupRequired);
    const [capacity, setCapacity] = React.useState(storageCard.capacity);
    const [iops, setIops] = React.useState(storageCard.iops);
    const [remarks, setRemarks] = React.useState(storageCard.remarks);

    React.useEffect(() => {
        const card: StorageCardItemInterface = {
            type: props.typeItems[type],
            volume: storageCard.volume,
            capacity: capacity,
            isEncryption: isEncrypt,
            iops: iops,
            isBackupRequired: isBackup,
            remarks: remarks,
        };
        setStorageCard(card);
    }, [type, isEncrypt, isBackup, capacity, iops, remarks]);

    React.useEffect(() => {
        props.editStorageCardItem(props.index, storageCard);
    }, [storageCard]);

    return (
        <div className="StorageCardItem">
            <div className="Storage-div">
                <h5>Type</h5>
                <Select
                    key={storageCard.type.label}
                    options={props.typeItems}
                    setRegion={setType}
                    default={storageCard.type}
                    activeTab={props.activeTab}
                    disabled={props.activeTab === 5}
                    capacity={capacity}
                    setCapacity={setCapacity}
                />
            </div>
            <div className="Storage-div">
                <h5>Volume</h5>
                <label>{storageCard.volume}</label>
            </div>
            <div className="Storage-div">
                <h5>Capacity (GB)</h5>
                <input
                    defaultValue={capacity}
                    type="number"
                    min={type == 0 ? 40 : 20}
                    max={type == 0 ? 2000 : 512}
                    disabled={props.activeTab === 5}
                    onChange={(e: any) => {
                        const capacityEntered = e.target.value;
                        if (type == 0 && capacityEntered < 40) {
                            e.target.value = 40;
                            setCapacity(40);
                        } else if (type == 0 && capacityEntered > 2000) {
                            e.target.value = 2000;
                            setCapacity(2000);
                        } else if (type == 1 && capacityEntered < 20) {
                            e.target.value = 20;
                            setCapacity(20);
                        } else if (type == 1 && capacityEntered > 512) {
                            e.target.value = 512;
                            setCapacity(512);
                        } else {
                            setCapacity(capacityEntered);
                        }
                        let vol: number = capacityEntered > 500 ? 1000 : iops;
                        vol = capacityEntered < 100 ? 100 : vol;
                        vol = capacityEntered >= 100 && capacityEntered <= 500 ? 600 : vol;
                        setIops(vol);
                    }}
                />
            </div>
            <div className="Storage-div">
                <h5>Encryption</h5>
                <input
                    type="checkbox"
                    value={0}
                    disabled={props.activeTab === 5}
                    defaultChecked={isEncrypt}
                    onClick={() => setIsEncrypt(!isEncrypt)}
                />
            </div>
            <div className="Storage-div">
                <h5>IOPS</h5>
                <label>{iops}</label>
            </div>
            <div className="Storage-div">
                <h5>Backup Required</h5>
                <input
                    type="checkbox"
                    value={0}
                    disabled={props.activeTab === 5}
                    defaultChecked={isBackup}
                    onClick={() => setIsBackup(!isBackup)}
                />
            </div>
            <div className="Storage-div">
                <h5>Remarks</h5>
                <input
                    defaultValue={remarks}
                    type="string"
                    disabled={props.activeTab === 5}
                    onChange={(e: any) => {
                        setRemarks(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};
