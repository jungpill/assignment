import styled from "styled-components";
import { useGetPaymentList } from "../../services/api";

interface Props {
    title: string
    value: string
}

const TotalAmount = ({
    title,
    value
    } : Props) => {

    value = new Intl.NumberFormat('ko-KR').format(Number(value))

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

export default TotalAmount;

const TotalAmountContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
`

const Value = styled.div`
    font-size: 22px;
    font-weight: 600;
`