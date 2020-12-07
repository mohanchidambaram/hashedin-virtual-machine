import React from 'react';
import './tab.css';

interface TabPropsInterface {
    tabItems: TabItemInterface[];
    activeTab: number;
}

interface TabItemInterface {
    id: number;
    label: string;
}

interface TabItemPropsInterface {
    id: number;
    label: string;
    activeTab: number;
}

export const Tab: React.FC<TabPropsInterface> = (props: TabPropsInterface) => {
    const tabItems: TabItemInterface[] = props.tabItems;

    return (
        <div className="Tab">
            <ul className="Tab-item-list">
                {tabItems.map((tabItem: TabItemInterface) => (
                    <TabItem key={tabItem.id} id={tabItem.id} label={tabItem.label} activeTab={props.activeTab} />
                ))}
            </ul>
        </div>
    );
};

const TabItem: React.FC<TabItemPropsInterface> = (props: TabItemPropsInterface) => {
    const btn_class = props.id === props.activeTab ? 'blue-button' : 'white-button';
    const btn_class_past = props.id < props.activeTab ? btn_class + '-past' : btn_class;
    return (
        <button className={btn_class_past} disabled>
            {props.id}. {props.label}
        </button>
    );
};
