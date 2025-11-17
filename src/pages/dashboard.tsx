import styled from "styled-components"
import { useMemo, useState } from "react"
import PaymentCard from "../components/dashboard/PaymentCard"
import { useGetPaymentList } from "../services/api"

const Dashboard = () => {

    const {data: totalAmountList} = useGetPaymentList()

    // 전체 거래내역을 통한 총 결제 금액 연산
    const {totalAmount,length} = useMemo(() => {
        if (!totalAmountList) return { totalAmount: 0, length: 0 }
    
        const temp = totalAmountList.data.filter((e) => e.amount);
    
        const totalAmount = temp.reduce((acc, cur) => acc + Number(cur.amount), 0);

        const length = totalAmountList.data.length
    
        return {totalAmount: totalAmount, length: length};
      }, [totalAmountList]); 
    
      if (!totalAmountList) return null;
      
    return(
        <DashboardContainer>
            <RowWrapper>
            <PaymentCard
            title="총 결제 금액"
            value={`${totalAmount.toLocaleString()}원`}
            />
            <PaymentCard
            title="총 결제 회수"
            value={`${length.toLocaleString()}회`}
            />
            <PaymentCard
            title="성공률"
            value="2000000"
            />
            <PaymentCard
            title="취소 비율"
            value="2000000"
            />
            </RowWrapper>

            <GridWrapper>
                
            </GridWrapper>
        </DashboardContainer>
    )
}

export default Dashboard

const DashboardContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 22px 30px;
    box-sizing: border-box;
    background: #F9FAFB;
`

const RowWrapper = styled.div`
    display: flex;
    width: 100%;
    border-radius: 80px;
`

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "test1 test2 test3 test4"
    "test5 test5"
    "test5 test5";
`