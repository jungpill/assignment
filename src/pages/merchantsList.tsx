import styled from "styled-components";
import MerchantsListTable from "../components/merchants/MerchantsListTable";
import Tab from "../components/merchants/Tab";
import { 
    useGetMerchantsList, 
    type Merchant,
    type MerchantLabel,
    type MerchantStatus } from "../services/api";
import { useState, useEffect, useMemo } from "react";

export interface Summary {
    status: MerchantStatus
    label: MerchantLabel
    value: number
}

export interface EditType {
    mchtCode: string;
    mchtName: string;
    status: MerchantStatus;
    bizType: string;
    phone: string
}

const MerchantsList = () => {

    const { data } = useGetMerchantsList()
    const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [active, setActive] = useState<MerchantStatus>('ACTIVE');

    const STATUS_CONFIG: { status: MerchantStatus; label: MerchantLabel }[] = [
        { status: 'ACTIVE', label: '영업중' },
        { status: 'CLOSED', label: '영업종료' },
        { status: 'READY', label: '준비중' },
        { status: 'INACTIVE', label: '정지' },
    ];

    useEffect(() => {
        if (data?.data) {
            setMerchants(data.data)
        }
    }, [data]);
    
    const summary = useMemo<Summary[]>(() => {
        const counts = { ACTIVE: 0, CLOSED: 0, READY: 0, INACTIVE: 0 };

        merchants.forEach(m => { counts[m.status]++ });

        return STATUS_CONFIG.map(cfg => ({
            status: cfg.status,
            label: cfg.label,
            value: counts[cfg.status],
        }));
    }, [merchants]);

    const handleDeleteMerchant = (code: string) => {
        setMerchants(prev =>
            prev.filter(m => m.mchtCode !== code) 
        );
    };

    // const handleUpdateMerchant = (updatedMerchant: Partial<Merchant> & { mchtCode: string }) => {
    //     setMerchants((prev) =>
    //         prev.map((m) =>
    //             m.mchtCode === updatedMerchant.mchtCode
    //                 ? { ...m, ...updatedMerchant }
    //                 : m
    //         )
    //     );
    // };

    return(
        <MerchantsListContainer>
            <Tab 
            summary={summary}
            active={active}
            setActive={setActive}
            />
            <MerchantsListTable 
            active={active}
            merchants={merchants}
            handleDeleteMerchant={handleDeleteMerchant}
            />
        </MerchantsListContainer>
    )
}

export default MerchantsList;

const MerchantsListContainer = styled.div`
    width: 100%;
    padding: 22px 30px;
    box-sizing: border-box;
    background: #F9FAFB;
    overflow-X: hidden;

`