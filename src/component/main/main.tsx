import React, { useEffect } from 'react';
import './main.css';
import Select, { SelectOptionInterface } from '../select/select';
import { Tab } from '../tab/tab';
import { ImageCardPropsInterface, ImageCardInterface, ImageCard } from '../imageCard/imageCard';
import { ReviewContent } from '../reviewContent/ReviewContent';
import { ErrorMessageDialog } from '../errorMessageDialog/ErrorMessageDialog';
import { InstanceLayout } from '../instanceLayout/InstanceLayout';
import { StorageCardItemInterface } from '../storageCard/storageCard';
import { StorageNetworkLayout } from '../storageNetworkLayout/StorageNetworkLayout';

const Main = (props: any) => {
    const regions = [
        { label: 'us-east-1', value: 1 },
        { label: 'us-east-2', value: 2 },
        { label: 'us-west-1', value: 3 },
        { label: 'india-1', value: 4 },
    ];

    const tabItems = [
        { id: 1, label: 'Choose Image' },
        { id: 2, label: 'Choose Instance Type' },
        { id: 3, label: 'Choose Storage and Network' },
        { id: 4, label: 'Configure Security' },
        { id: 5, label: 'Review & Launch' },
    ];

    const cardImageItems: ImageCardInterface[] = [
        {
            id: 1,
            title: 'Linux 2 Image',
            description:
                'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
            bitItems: ['64-bit(x86)', '64-bit(ARM)'],
            price: 243.61,
            region: 4,
        },
        {
            id: 2,
            title: 'Ubuntu Server 18.04 LTS',
            description:
                'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
            bitItems: ['64-bit(x86)', '64-bit(ARM)'],
            price: 243.61,
            region: 4,
        },
        {
            id: 3,
            title: 'Red Hat Enterprise Linux 8',
            description:
                'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
            bitItems: ['64-bit(x86)', '64-bit(ARM)'],
            price: 300,
            region: 4,
        },
        {
            id: 4,
            title: 'Microsoft Windows Server 2019 Base',
            description:
                'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
            bitItems: ['64-bit(x86)'],
            price: 338.77,
            region: 2,
        },
        {
            id: 5,
            title: 'SUSE Linux Enterprise Server',
            description:
                'Linux 2 comes with 5 years od support. It provides Linux kernel 4.14 tuned for optical performance',
            bitItems: ['64-bit(x86)', '64-bit(ARM)'],
            price: 200.22,
            region: 4,
        },
    ];

    const instanceTypeCards = [
        { id: 1, type: 'General Purpose', memory: 0, cpu: 0 },
        { id: 2, type: 'Storage Optimized', memory: 1, cpu: 1 },
        { id: 3, type: 'CPU Optimized', memory: 1, cpu: 2 },
        { id: 4, type: 'Network Optimized', memory: 2, cpu: 3 },
    ];

    const storageTypeItems = [
        { label: 'Magnetic Disks', value: 0 },
        { label: 'SSD', value: 1 },
    ];
    const storageCards: StorageCardItemInterface[] = [
        {
            type: { label: 'Magnetic Disks', value: 0 },
            volume: 'Root',
            capacity: 120,
            isEncryption: true,
            iops: 600,
            isBackupRequired: true,
            remarks: 'Some Remarks',
        },
    ];

    const [activeTab, setActiveTab] = React.useState(1);
    const [region, setRegion] = React.useState(1);
    const [image, setImage] = React.useState(1);
    const [bits, setBits] = React.useState('64-bit(x86)');
    const [instanceType, setInstanceType] = React.useState(1);

    const [coreItem, setCoreItem] = React.useState({ value: 0, label: '1 Core' });
    const [memoryItem, setMemoryItem] = React.useState({ value: 0, label: '256MB' });

    const [storageDetail, setStorageDetail] = React.useState(storageCards);

    const [bandwidth, setBandwidth] = React.useState(512);
    const [bandwidthCost, setBandwidthCost] = React.useState(5);
    const [totalPrice, setTotalPrice] = React.useState(0);

    React.useEffect(() => {
        let totalCost = cardImageItems[image - 1].price;
        if (activeTab > 1 && coreItem.label === '8 Core') {
            totalCost = totalCost + 20;
        } else if (activeTab > 1 && coreItem.label === '16 Core') {
            totalCost = totalCost + 40;
        }
        if (activeTab > 1 && memoryItem.label === '32GB') {
            totalCost = totalCost + 20;
        } else if (activeTab > 1 && memoryItem.label === '64GB') {
            totalCost = totalCost + 40;
        }
        if (activeTab > 2 && storageDetail.length > 1) {
            storageDetail
                .filter((storageInformation, valueIndex) => valueIndex !== 0)
                .map((storageInformation) => {
                    const storageCost = storageInformation.type.value === 0 ? 20 : 40;
                    totalCost = totalCost + storageCost;
                });
        }
        if (activeTab > 2 && bandwidth < 1000 && bandwidth >= 512) {
            setBandwidthCost(5);
            totalCost = totalCost + 5;
        } else if (activeTab > 2 && bandwidth >= 1000 && bandwidth < 1500) {
            setBandwidthCost(10);
            totalCost = totalCost + 10;
        } else if (activeTab > 2 && bandwidth >= 1500) {
            setBandwidthCost(15);
            totalCost = totalCost + 15;
        }
        setTotalPrice(totalCost);
    }, [image, coreItem, memoryItem, storageDetail, bandwidth]);

    const addStorageCard = (storageCardList: StorageCardItemInterface[]): void => {
        setStorageDetail(storageCardList);
    };

    const updateCore = (coreValue: SelectOptionInterface): void => {
        setCoreItem(coreValue);
    };

    const updateMemory = (memoryValue: SelectOptionInterface): void => {
        setMemoryItem(memoryValue);
    };

    return (
        <div className="Main">
            <div className="Main-body">
                <div className="Main-Tab-div">
                    <div className="Region-select-div">
                        <h2>{tabItems[activeTab - 1].label}</h2>
                        <div className="region-select">
                            <Select
                                key={regions[region - 1].label}
                                options={regions}
                                setRegion={setRegion}
                                default={regions[region - 1]}
                                activeTab={activeTab}
                                image={image}
                                setImage={setImage}
                                disabled={activeTab > 1}
                            />
                        </div>
                    </div>
                    <div className="Tab-items-div">
                        <Tab tabItems={tabItems} activeTab={activeTab} />
                    </div>
                    <div className="Image-Tab-Contents">
                        {activeTab === 1 ? (
                            <ImageCard
                                imageCards={cardImageItems}
                                region={region}
                                activeTab={activeTab}
                                setImage={setImage}
                                setBits={setBits}
                            />
                        ) : null}
                    </div>
                    <div className="InstanceType-Tab-Contents">
                        {activeTab === 2 ? (
                            <InstanceLayout
                                activeTab={activeTab}
                                instanceTypeCards={instanceTypeCards}
                                instanceType={instanceType}
                                setInstanceType={setInstanceType}
                                coreItem={coreItem}
                                updateCore={updateCore}
                                memoryItem={memoryItem}
                                updateMemory={updateMemory}
                                bandwidth={bandwidth}
                                setBandwidth={setBandwidth}
                            ></InstanceLayout>
                        ) : null}
                    </div>
                    <div className="Storage-Tab-Contents">
                        {activeTab === 3 ? (
                            <StorageNetworkLayout
                                typeItems={storageTypeItems}
                                storageCards={storageDetail}
                                activeTab={activeTab}
                                addStorageCard={addStorageCard}
                                bandwidth={bandwidth}
                                setBandwidth={setBandwidth}
                                selectedInstanceType={instanceType}
                            />
                        ) : null}
                    </div>
                    <div className="Security-Tab-Contents">
                        {activeTab === 4 ? (
                            <h5>
                                Security Configuration is still under Development, But Dont worry, You will be provided
                                with high level security configured at free of cost.
                            </h5>
                        ) : null}
                    </div>
                    <div className="Review-Tab-Contents">
                        {activeTab === 5 ? (
                            <ReviewContent
                                key="1"
                                imageCard={cardImageItems[image - 1]}
                                setBits={setBits}
                                setImage={setImage}
                                region={region}
                                bits={bits}
                                activeTab={activeTab}
                                instanceType={instanceTypeCards[instanceType - 1].type}
                                core={coreItem.label}
                                memory={memoryItem.label}
                                bandwidth={bandwidth}
                                typeItems={storageTypeItems}
                                storageCards={storageDetail}
                                setActiveTab={setActiveTab}
                            ></ReviewContent>
                        ) : null}
                    </div>
                    <div className="Footer-div">
                        <div>
                            {activeTab === 5 ? (
                                <button
                                    className="cancel-button"
                                    onClick={() => {
                                        setActiveTab(1);
                                        setRegion(1);
                                        setImage(1);
                                        setBits('64-bit(ARM)');
                                    }}
                                >
                                    Cancel
                                </button>
                            ) : null}
                        </div>
                        <div>
                            {activeTab > 1 ? (
                                <button className="back-button" onClick={() => setActiveTab(activeTab - 1)}>
                                    Back
                                </button>
                            ) : null}
                        </div>
                        <div>
                            {
                                <button
                                    className="proceed-button"
                                    onClick={() => {
                                        setActiveTab(activeTab === 5 ? 1 : activeTab + 1);
                                    }}
                                >
                                    {activeTab === 5 ? 'Launch' : 'Proceed'}
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="Cost-div">
                    <h3>Cost Estimates</h3>
                    <div className="Cost-items-div">
                        <label>{cardImageItems[image - 1].title}</label>
                        <label>${cardImageItems[image - 1].price}</label>
                    </div>
                    <div>
                        {activeTab > 1 && coreItem.label === '8 Core' ? (
                            <div className="Cost-items-div">
                                <label>CPU</label>
                                <label>$20.00</label>
                            </div>
                        ) : null}
                        {activeTab > 1 && coreItem.label === '16 Core' ? (
                            <div className="Cost-items-div">
                                <label>CPU</label>
                                <label>$40.00</label>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {activeTab > 1 && memoryItem.label === '32GB' ? (
                            <div className="Cost-items-div">
                                <label>Memory</label>
                                <label>$20.00</label>
                            </div>
                        ) : null}
                        {activeTab > 1 && memoryItem.label === '64GB' ? (
                            <div className="Cost-items-div">
                                <label>Memory</label>
                                <label>$40.00</label>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {activeTab > 2 && storageDetail.length > 1 ? (
                            <div>
                                {storageDetail
                                    .filter((storageInformation, valueIndex) => valueIndex !== 0)
                                    .map((storageInformation, valueIndex) => {
                                        return (
                                            <div className="Cost-items-div" key={valueIndex}>
                                                <label>{`External ${storageInformation.type.label}`}</label>
                                                <label>
                                                    {storageInformation.type.value === 0 ? '$20.00' : '$40.00'}
                                                </label>
                                            </div>
                                        );
                                    })}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        {activeTab > 2 ? (
                            <div className="Cost-items-div">
                                <label>{bandwidth} GB Bandwidth</label>
                                <label>${bandwidthCost}.00</label>
                            </div>
                        ) : null}
                    </div>
                    <div className="Total-price-div">
                        <label>${totalPrice} /mo</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
