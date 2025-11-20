import styled from "styled-components";
import PaymentHistoryTable from '../components/dashboard/PaymentHistoryTable'

const MerchantsList = () => {


    return(
        <MerchantsListContainer>
            <PaymentHistoryTable limit={false}/>
        </MerchantsListContainer>
    )
}

export default MerchantsList;

const MerchantsListContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 22px 30px;
    box-sizing: border-box;
    background: #F9FAFB;
    overflow-X: hidden;

`