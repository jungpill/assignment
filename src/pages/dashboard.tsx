import styled from "styled-components"
import { useMemo, useState } from "react"
import PaymentCard from "../components/dashboard/PaymentCard"
import { useGetPaymentList } from "../services/api"

const Dashboard = () => {

    const {data: totalAmountList} = useGetPaymentList()

    // 전체 거래내역을 통한 총 결제 금액 연산
    const {totalAmount,length, successRate, canceledRate} = useMemo(() => {
        if (!totalAmountList) return { 
            totalAmount: 0, 
            length: 0, 
            successRate: 0, 
            canceledRate: 0
         };
    
        let totalAmount = 0;
        let successCount = 0;
        let canceledCount = 0;

        totalAmountList.data.forEach((payment: { amount: number; status: string }) => {
            totalAmount += Number(payment.amount);
    
            if(payment.status === "SUCCESS") successCount++;
            if(payment.status === "CANCELLED") canceledCount++;
        })
                
        const length = totalAmountList.data.length

        const successRate = length > 0 ? (successCount / length) * 100 : 0;
        const cancelRate = length > 0 ? (canceledCount / length) * 100 : 0;
    
        return {
            totalAmount: totalAmount, 
            length: length, 
            successRate: successRate.toFixed(0),
            canceledRate: cancelRate.toFixed(0),
        };
      }, [totalAmountList]); 
      
    return(
        <DashboardContainer>
            <RowWrapper>
                <PaymentCard
                title="총 결제 금액"
                value={`${totalAmount.toLocaleString()}원`}
                />
                <PaymentCard
                title="총 결제 횟수"
                value={`${length.toLocaleString()}회`}
                />
                <PaymentCard
                title="성공률"
                value={`${successRate}%`}
                />
                <PaymentCard
                title="취소 비율"
                value={`${canceledRate}%`}
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