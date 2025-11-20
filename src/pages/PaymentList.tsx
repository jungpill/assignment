import styled from "styled-components";
import PaymentHistoryTable from "../components/dashboard/PaymentHistoryTable";

const PaymentList = () => {

    return(
        <MerchantsListContainer>
            <PaymentHistoryTable
            limit={false}
            />
        </MerchantsListContainer>
    )
}

export default PaymentList;

const MerchantsListContainer = styled.div`
    width: 100%;
    padding: 22px 30px;
    box-sizing: border-box;
    background: #F9FAFB;
    overflow-X: hidden;
`