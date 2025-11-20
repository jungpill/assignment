import styled from "styled-components";
import { openDetailModal } from "../modal/DetailModal";
import { type MerchantStatus, type Merchant } from "../../services/api";
import { type Summary } from "../../pages/MerchantsList";
import { useMemo } from "react";
import { AppImage } from "../../assets/images/images";

interface Props {
    active: MerchantStatus
    merchants: Merchant[]
    summary: Summary[]
}

const MerchantsListTable = ({
    active,
    merchants,
    summary
    }: Props) => {

    const showDetailModal = (code: string) => {
        openDetailModal(code)
    }
    
    const filteredMerchants = useMemo(
        () => merchants.filter(m => m.status === active),
        [merchants, active]
    );
    
    return(
        <Container>
            <Title>
                매장 관리
            </Title>
            <TableHeader>
                <HeaderCell >코드</HeaderCell>
                <HeaderCell >매장명</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>가맹정 상태</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>업종</HeaderCell>
            </TableHeader>

            <Body>
                {filteredMerchants.map((r, idx) => (
                 <DataRow key={r.mchtCode} onClick={() => showDetailModal(r.mchtCode)}>
                    <span>{r.mchtCode}</span>
                    <span>{r.mchtName}</span>
                    <span>{r.status}</span>
                    <span>{r.bizType}</span>
                    <span><AppImage name="MenuIcon" customStyle={{width: 20, height: 20, marginRight: 10}}/></span>
                </DataRow>
                 ))}
            </Body>
        </Container>
    )
}

export default MerchantsListTable

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 24px;
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    box-sizing: border-box;
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.4fr;
    width: 100%;
    border-bottom: 1px solid #E5E7EB;

    & > span {
    color: #6B7280;
    font-weight: 600;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-self: center;
    }    
`;

const HeaderCell = styled.span` 
    font-size: 18px;
    color: #6b7280;
    font-weight: 500;
    padding: 16px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Body = styled.div`
    display: grid;
    grid-auto-rows: 56px; 
    font-size: 18px;
    font-weight: 400;
    color: #000;
`;

const DataRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.4fr;
    justify-items: center;
    border-bottom: 1px solid #E5E7EB;
    cursor: pointer;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    padding: 20px;
    font-weight: 600;
    align-items: center;
`
