import styled from "styled-components"
import { type MerchantStatus } from "../../services/api"
import type { Summary } from "../../pages/MerchantsList"

export interface Props {
    summary: Summary[]
    active: MerchantStatus
    setActive: (active: MerchantStatus) => void;
}

const Tab = ({
    summary,
    active,
    setActive
    }: Props) => {
    
    return(
        <Container>
            {summary.map((item, index) => (
                <Item 
                key={index} 
                $active={item.status === active}
                onClick={() => setActive(item.status)}
                >
                    {item.label} 
                    <Badge $active={item.status === active}>
                       {item.value}
                    </Badge>
                </Item>
            ))}
        </Container>
    )
}

export default Tab;

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const Item = styled.div<{ $active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 30%;
    max-height: 80px;
    padding: 24px 0;
    box-sizing: border-box;
    color: ${props => props.$active ? '#3B82F6' : '#6B7280'};
    border-bottom: ${props => props.$active ? '2px solid #3B82F6' : 'none'};
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
`

const Badge = styled.div<{ $active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49px;
    height: 27px;
    background-color: ${props => props.$active ? '#3B82F6' : '#6B7280'};
    color: #fff;
    border-radius: 100px;
    padding: 4px 0px;
    box-sizing: border-box;
`