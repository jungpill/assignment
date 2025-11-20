import styled from "styled-components";
import { useGetPaymentList } from "../../services/api";
import { openDetailModal } from "../modal/DetailModal";
import { AppImage } from "../../assets/images/images";
import { useNavigate } from "react-router-dom";
import { useSidebarStore } from "../../stores/useSidebarStore";

const PaymentHistoryTable = ({
    limit
    }: {limit: boolean}) => {

    const {data: totalAmountList, isLoading} = useGetPaymentList()
    const setMenu = useSidebarStore(p => p.setItem)

    const sliceValue = limit ? 3 : totalAmountList?.data.length

    const navigate = useNavigate()

    if(isLoading || !totalAmountList) return null;

    const showDetailModal = (code: string) => {
        openDetailModal(code)
    }

    const handleNavigate = () => {
        navigate('/payment-list')
        setMenu('매장관리')
    }

    return(
        <Container>
            <Title>
                결제 내역
                <MoreButton onClick={handleNavigate}>
                    더보기
                    <AppImage name='ArrowIcon'/>
                </MoreButton>
            </Title>
            <TableHeader>
                <HeaderCell >코드</HeaderCell>
                <HeaderCell >결제 금액</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>결제 방식</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>결제 상태</HeaderCell>
            </TableHeader>

            <Body>
                {totalAmountList.data.slice(0,sliceValue).map((r) => (
                <DataRow key={r.mchtCode} onClick={() => showDetailModal(r.mchtCode)}>
                <span>{r.mchtCode}</span>
                <span>{Number(r.amount).toLocaleString()}</span>
                <span>{r.payType}</span>
                <span>{r.status}</span>
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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