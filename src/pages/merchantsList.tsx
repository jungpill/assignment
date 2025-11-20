import styled from "styled-components";
import MerchantsListTable from "../components/merchants/MerchantsListTable";

const MerchantsList = () => {


    return(
        <MerchantsListContainer>
            <MerchantsListTable/>
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