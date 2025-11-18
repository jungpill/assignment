import styled from "styled-components"
import { useMemo, useState } from "react"
import PaymentCard from "../components/dashboard/PaymentCard"
import { useGetPaymentList } from "../services/api"
import Doughnutchart from '../components/dashboard/Doughnutchart'
import type {PayType} from '../services/api'

export type ChartItem = {
  type: PayType;
  value: number;
};

const Dashboard = () => {

    const {data: totalAmountList, isLoading} = useGetPaymentList()

    const counts = {
        ONLINE: 0,
        DEVICE: 0,
        MOBILE: 0,
        VACT: 0,
        BILLING: 0,
    };
    
    console.log(totalAmountList)
    

    // 전체 거래내역을 통한 총 결제 금액 연산
    const {totalAmount,length, successCount, canceledCount, chartData} = useMemo(() => {
        if (!totalAmountList) return { 
            totalAmount: 0, 
            length: 0, 
            successRate: 0, 
            canceledRate: 0
         };
    
        let totalAmount = 0;
        let successCount = 0;
        let canceledCount = 0;

        totalAmountList.data.forEach((payment) => {
            totalAmount += Number(payment.amount);
            counts[payment.payType]++;
            if(payment.status === "SUCCESS") successCount++;
            if(payment.status === "CANCELLED") canceledCount++;
            
        })
                
        const length = totalAmountList.data.length

        const chartData = [{
            type: 'ONLINE',
            label: '온라인',
            value: counts.ONLINE,
        },
        {
            type: 'DEVICE',
            label: '디바이스',
            value: counts.DEVICE,
        },
        {
            type: 'MOBILE',
            label: '모바일',
            value: counts.MOBILE,
        },
        {
            type: 'VACT',
            label: '가상계좌',
            value: counts.VACT,
        },
        {
            type: 'BILLING',
            label: '빌링',
            value: counts.BILLING,
        }]
    
        return {
            totalAmount, 
            length, 
            successCount,
            canceledCount,
            chartData
        };
      }, [totalAmountList]); 

      if (isLoading) return null;
      // 추후 paymentCard에 icon 추가

        const successRate = length > 0 ? (successCount / length) * 100 : 0;
        const cancelRate = length > 0 ? (canceledCount / length) * 100 : 0;
        console.log(chartData)
    return(
        <DashboardContainer>
            <RowWrapper>
                <PaymentCard
                title="총 결제 금액"
                value={`${totalAmount.toLocaleString()}원`}
                />
                <PaymentCard
                title="총 결제 횟수"
                value={`${length.toLocaleString()}건`}
                />
                <PaymentCard
                title="성공률"
                value={`${successRate}%`}
                />
                <PaymentCard
                title="취소 비율"
                value={`${cancelRate}%`}
                />
                
            </RowWrapper>

            <Doughnutchart
            
            />

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
    gap: 22px;
`

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "test1 test2 test3 test4"
    "test5 test5"
    "test5 test5";
`