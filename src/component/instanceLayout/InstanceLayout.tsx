import React from 'react';
import './InstanceLayout.css';
import Select, { SelectOptionInterface } from '../select/select';
import { ErrorMessageDialog } from '../errorMessageDialog/ErrorMessageDialog';

interface InstanceLayoutPropsInteface {
    activeTab: number;
    instanceTypeCards: InstanceTypesInterface[];
    setInstanceType: any;
    instanceType: number;
    coreItem: SelectOptionInterface;
    updateCore: any;
    memoryItem: SelectOptionInterface;
    updateMemory: any;
    bandwidth: number;
    setBandwidth: any;
}
interface InstanceTypesInterface {
    id: number;
    type: string;
    memory: number;
    cpu: number;
}
export const InstanceLayout: React.FC<InstanceLayoutPropsInteface> = (props: InstanceLayoutPropsInteface) => {
    const instanceTypeCards = props.instanceTypeCards;

    const memoryValues = [
        ['256MB', '512MB', '1GB', '2GB', '4GB'],
        ['16GB', '32GB', '64GB'],
        ['256MB', '512MB', '1GB', '2GB', '4GB', '16GB', '32GB', '64GB'],
    ];
    const coreValues = [
        ['1 Core', '2 Core', '4 Core'],
        ['1 Core', '8 Core', '16 Core'],
        ['1 Core', '2 Core', '8 Core', '16 Core'],
        ['1 Core', '2 Core', '4 Core', '8 Core', '16 Core'],
    ];

    const fetchMemoryOptions = (): SelectOptionInterface[] => {
        return memoryValues[instanceTypeCards[props.instanceType - 1].memory].map(
            (memory, index): SelectOptionInterface => ({ label: memory, value: index }),
        );
    };

    const fetchCoreOptions = (): SelectOptionInterface[] => {
        return coreValues[instanceTypeCards[props.instanceType - 1].cpu].map((cpu, index) => ({
            label: cpu,
            value: index,
        }));
    };

    const [coreOptions, setCoreOptions] = React.useState<SelectOptionInterface[]>(fetchCoreOptions());
    const [memoryOptions, setMemoryOptions] = React.useState<SelectOptionInterface[]>(fetchMemoryOptions());
    const [coreSelected, setCoreSelected] = React.useState<SelectOptionInterface>(props.coreItem);
    const [memorySelected, setMemorySelected] = React.useState<SelectOptionInterface>(props.memoryItem);
    const [tempMemory, setTempMemory] = React.useState<SelectOptionInterface>(memorySelected);
    const [tempCore, setTempCore] = React.useState<SelectOptionInterface>(coreSelected);
    const [coreIndex, setCoreIndex] = React.useState(coreSelected.value);
    const [memoryIndex, setMemoryIndex] = React.useState(memorySelected.value);

    const [isErrorProceed, setIsErrorProceed] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isBandwidthError, setIsBandwidthError] = React.useState(false);
    const [tempInstanceId, setTempInstanceId] = React.useState(props.instanceType);

    const [errorMessage, setErrorMessage] = React.useState('If you proceed you may lose data');

    const bandwidthErrorMessage = 'Outbound network transfer range for this instance is 512 GB - 1 TB only.';
    React.useEffect(() => {
        if (isErrorProceed) {
            props.setInstanceType(tempInstanceId);
            if (isBandwidthError) {
                props.setBandwidth(1000);
                setIsBandwidthError(false);
            }
            setIsError(false);
            setIsErrorProceed(false);
        }
    }, [isErrorProceed]);

    React.useEffect(() => {
        onInstanceChange();
    }, [props.instanceType]);

    const checkBandwidthError = (id: number): void => {
        if (props.bandwidth > 1000 && id < 4) {
            setIsBandwidthError(true);
            checkError(id, true);
        } else {
            checkError(id, false);
        }
    };
    const checkError = (id: number, isBwError: boolean): void => {
        const newMemoryList: string[] = memoryValues[instanceTypeCards[id - 1].memory];
        const newCoreList: string[] = coreValues[instanceTypeCards[id - 1].cpu];
        const newMemoryIndex = newMemoryList.indexOf(props.memoryItem.label);
        const newCoreIndex = newCoreList.indexOf(props.coreItem.label);
        const isMemory = !newMemoryList.includes(props.memoryItem.label);
        const isCore = !newCoreList.includes(props.coreItem.label);
        const additionalMessage: string = isBwError ? bandwidthErrorMessage : '';
        if (isMemory && isCore) {
            setErrorMessage(
                additionalMessage +
                    props.memoryItem.label +
                    ' and ' +
                    props.coreItem.label +
                    ' is not available for ' +
                    instanceTypeCards[id - 1].type,
            );
            setTempInstanceId(id);
            setTempMemory({ label: newMemoryList[0], value: 0 });
            setTempCore({ label: newCoreList[0], value: 0 });
            setIsError(true);
        } else if (isCore) {
            setErrorMessage(
                additionalMessage + props.coreItem.label + ' is not available for ' + instanceTypeCards[id - 1].type,
            );
            setTempInstanceId(id);
            setTempMemory({ label: props.memoryItem.label, value: newMemoryIndex });
            setTempCore({ label: newCoreList[0], value: 0 });
            setIsError(true);
        } else if (isMemory) {
            setErrorMessage(
                additionalMessage + props.memoryItem.label + ' is not available for ' + instanceTypeCards[id - 1].type,
            );
            setTempInstanceId(id);
            setTempMemory({ label: newMemoryList[0], value: 0 });
            setTempCore({ label: props.coreItem.label, value: newCoreIndex });
            setIsError(true);
        } else if (isBandwidthError) {
            setErrorMessage(bandwidthErrorMessage);
            setTempInstanceId(id);
            setTempMemory({ label: props.memoryItem.label, value: newMemoryIndex });
            setTempCore({ label: props.coreItem.label, value: newCoreIndex });
            setIsError(true);
        } else {
            props.setInstanceType(id);
            setTempMemory({ label: props.memoryItem.label, value: newMemoryIndex });
            setTempCore({ label: props.coreItem.label, value: newCoreIndex });
        }
    };

    const onInstanceChange = (): void => {
        const memorySelectValues: SelectOptionInterface[] = fetchMemoryOptions();
        const coreSelectValues: SelectOptionInterface[] = fetchCoreOptions();
        setCoreOptions(coreSelectValues);
        setMemoryOptions(memorySelectValues);
        props.updateCore(tempCore);
        props.updateMemory(tempMemory);
        setCoreSelected(tempCore);
        setMemorySelected(tempMemory);
    };

    const updateCoreSelected = (coreValue: SelectOptionInterface): void => {
        setCoreSelected(coreValue);
    };

    const updateMemorySelected = (memoryValue: SelectOptionInterface): void => {
        setMemorySelected(memoryValue);
    };

    React.useEffect(() => {
        const coreLabel = coreValues[instanceTypeCards[props.instanceType - 1].cpu][coreIndex];
        updateCoreSelected({ label: coreLabel, value: coreIndex });
    }, [coreIndex]);

    React.useEffect(() => {
        const memoryLabel = memoryValues[instanceTypeCards[props.instanceType - 1].memory][memoryIndex];
        updateMemorySelected({ label: memoryLabel, value: memoryIndex });
    }, [memoryIndex]);

    React.useEffect(() => {
        props.updateCore(coreSelected);
    }, [coreSelected]);

    React.useEffect(() => {
        props.updateMemory(memorySelected);
    }, [memorySelected]);

    return (
        <div className="Instance-Layout">
            <div className="Instance-type-div">
                <ul className="Instance-type-list">
                    {instanceTypeCards.map((instanceTypeItem: { id: number; type: string }) => (
                        <button
                            key={instanceTypeItem.id}
                            className={
                                props.instanceType === instanceTypeItem.id
                                    ? 'Instance-type-button-selected'
                                    : 'Instance-type-button'
                            }
                            onClick={() => {
                                checkBandwidthError(instanceTypeItem.id);
                            }}
                        >
                            {instanceTypeItem.type}
                        </button>
                    ))}
                </ul>
            </div>
            <div className="Configuration">
                <h4>Create Configuration</h4>
                <div className="Cpu-Memory-div">
                    <div className="Select-div">
                        <Select
                            key={coreSelected.label}
                            options={coreOptions}
                            setRegion={setCoreIndex}
                            default={coreSelected}
                            activeTab={props.activeTab}
                            disabled={false}
                        />
                    </div>
                    <div className="Select-div">
                        <Select
                            key={memorySelected.label}
                            options={memoryOptions}
                            setRegion={setMemoryIndex}
                            default={memorySelected}
                            activeTab={props.activeTab}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
            <div className="ErrorMessageDialog">
                {isError ? (
                    <ErrorMessageDialog
                        message={errorMessage}
                        setIsError={setIsError}
                        setIsErrorProceed={setIsErrorProceed}
                    />
                ) : null}
            </div>
        </div>
    );
};
