import styled from "styled-components";
import { useGetPaymentList } from "../../services/api";

const PaymentHistoryTable = () => {

    const {data: totalAmountList, isLoading} = useGetPaymentList()

    if(isLoading || !totalAmountList) return null;

    return(
        <Container>
            <TableHeader>
                <HeaderCell style={{paddingLeft: '40px'}}>결제코드</HeaderCell>
                <HeaderCell style={{paddingLeft: '40px'}}>결제일</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>결제 방식</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>금액</HeaderCell>
                <HeaderCell style={{justifyContent: 'center'}}>상태</HeaderCell>
            </TableHeader>

            <Body>
            {totalAmountList.data.slice(95).map((r,idx) => (
            <DataRow key={r.paymentCode + idx}>
            <span>{r.paymentCode}</span>
            <span>{r.paymentAt.slice(0,10)}</span>
            <span>{r.payType}</span>
            <span>{Number(r.amount).toLocaleString()}</span>
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
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    border-bottom: 1px solid #E5E7EB;

    & > span {
    color: #6B7280;
    font-weight: 600;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-self: start;
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    border-bottom: 1px solid #E5E7EB;
    cursor: pointer;
    margin-left: 10px;
`;