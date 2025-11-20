import styled from "styled-components";
import { useGetMerchantsList } from "../../services/api";
import { openDetailModal } from "../modal/DetailModal";
import { AppImage } from "../../assets/images/images";
import { useNavigate } from "react-router-dom";

const PaymentHistoryTable = ({limit}: {limit:boolean}) => {

    const {data: totalAmountList, isLoading} = useGetMerchantsList()

    const navigate = useNavigate()

    const sliceValue = limit ? 3 : totalAmountList?.data.length

    if(isLoading || !totalAmountList) return null;

    const showDetailModal = (code: string) => {
        openDetailModal(code)
    }

    return(
        <Container>
            <Title>
                관리 매장
                <MoreButton onClick={() => navigate('/merchants-list')}>
                    더보기
                    <AppImage name='ArrowIcon'/>
                </MoreButton>
            </Title>
            <TableHeader>
                <HeaderCell >코드</HeaderCell>
                <HeaderCell >매장명</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>가맹정 상태</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>업종</HeaderCell>
            </TableHeader>

            <Body>
                {totalAmountList.data.slice(0, sliceValue).map((r) => (
                <DataRow key={r.mchtCode} onClick={() => showDetailModal(r.mchtCode)}>
                <span>{r.mchtCode}</span>
                <span>{r.mchtName}</span>
                <span>{r.status}</span>
                <span>{r.bizType}</span>
                
                </DataRow>
                ))}
            </Body>
        </Container>
    )
}

export default PaymentHistoryTable

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 24px;
    background: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    box-sizing: border-box;
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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

const MoreButton = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #6B7280;
    font-size: 18px;
    line-height: 1;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    &:hover {
        color: #374151;
    }
`