import styled from "styled-components"
import { useMemo, useState } from "react"
import PaymentCard from "../components/dashboard/PaymentCard"
import { useGetPaymentList } from "../services/api"
import Doughnutchart from '../components/dashboard/Doughnutchart'
import type {PaymentStatus, PayType, PayLabel} from '../services/api'
import PaymentHistoryTable from "../components/dashboard/PaymentHistoryTable"

export type ChartItem = {
  type: PayType;
  value: number;
  label: PayLabel
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

    // 전체 거래내역을 통한 총 결제 금액, 횟수, 성공률, 취소 비율, 계산 및 차트에 사용될 데이터 가공
    const status = useMemo(() => {
        if (!totalAmountList) return { 
            totalAmount: 0, 
            length: 0, 
            successCount: 0, 
            canceledCount: 0,
            successRate: 0,
            cancelRate: 0,
            chartData: [],
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
        const successRate = length > 0 ? (successCount  / length) * 100 : 0;
        const cancelRate = length > 0 ? (canceledCount / length) * 100 : 0;

        const chartData: ChartItem[] = [
            { type: 'ONLINE', label: '온라인', value: counts.ONLINE },
            { type: 'DEVICE', label: '단말기', value: counts.DEVICE },
            { type: 'MOBILE', label: '모바일', value: counts.MOBILE },
            { type: 'VACT', label: '가상계좌', value: counts.VACT },
            { type: 'BILLING', label: '정기결제', value: counts.BILLING },
        ];
    
        return {
            totalAmount, 
            length, 
            successCount,
            canceledCount,
            chartData,
            successRate,
            cancelRate,
        };
      }, [totalAmountList]); 

      if (isLoading) return null;
      // 추후 paymentCard에 icon 추가

    
    return(
        <DashboardContainer>
            <RowWrapper>
                <PaymentCard
                title="총 결제 금액"
                value={`${status.totalAmount.toLocaleString()}원`}
                />
                <PaymentCard
                title="총 결제 횟수"
                value={`${status.length.toLocaleString()}건`}
                />
                <PaymentCard
                title="성공률"
                value={`${status.successRate}%`}
                />
                <PaymentCard
                title="취소 비율"
                value={`${status.cancelRate}%`}
                />
                
            </RowWrapper>

            <RowWrapper>
            <Doughnutchart
                chartData={status.chartData as ChartItem[]}
            />
            </RowWrapper>

            <RowWrapper>
            <PaymentHistoryTable/>
            </RowWrapper>
            
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
    overflow-X: hidden;
`

const RowWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 22px;
`