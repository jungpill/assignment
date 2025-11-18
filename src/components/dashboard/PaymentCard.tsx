import styled from "styled-components";
import { useGetPaymentList } from "../../services/api";

interface Props {
    title: string
    value: string
}

const PaymentCard = ({
    title,
    value
    } : Props) => {

    return(
        <TotalAmountContainer>
            <Title>
                {title}
            </Title>
            <Value>
                {value}
            </Value>
        </TotalAmountContainer>
    )
}

export default PaymentCard;

const TotalAmountContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    background: #fff;
    align-items: center;
    height: 100px;
    border: none;
    gap: 3px;
    border-radius: 8px;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
`

const Value = styled.div`
    font-size: 22px;
    font-weight: 600;
`