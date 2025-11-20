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

const MerchantsList = () => {

    const { data } = useGetMerchantsList()
    const [merchants, setMerchants] = useState<Merchant[]>([]);

    useEffect(() => {
        if (data?.data) {
            setMerchants(data.data)
        }
    }, [data]);

    const summary = useMemo(() => {
        const counts = {
            ACTIVE: 0,
            CLOSED: 0,
            READY: 0,
            INACTIVE: 0,
        };
        
        merchants.forEach((m) => {
            counts[m.status]++;
        });
        
        return [
            { status: 'ACTIVE', label: '영업중', value: counts.ACTIVE },
            { status: 'CLOSED', label: '영업종료', value: counts.CLOSED },
            { status: 'READY', label: '준비중', value: counts.READY },
            { status: 'INACTIVE', label: '정지', value: counts.INACTIVE },
        ] as Summary[];
    }, [merchants]);

    return(
        <MerchantsListContainer>
            <Tab
            summary={summary}
            />
            <MerchantsListTable/>
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