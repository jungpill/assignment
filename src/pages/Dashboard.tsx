import styled from "styled-components"
import { useMemo} from "react"
import PaymentCard from "../components/dashboard/PaymentCard"
import { useGetPaymentList } from "../services/api"
import Doughnutchart from '../components/dashboard/Doughnutchart'
import type { PayType, PayLabel} from '../services/api'
import PaymentHistoryTable from "../components/dashboard/PaymentHistoryTable"
import { PieChart, type StatusChartItem} from "../components/dashboard/PieChart"

export type ChartItem = {
  type: PayType;
  value: number;
  label: PayLabel
};

const Dashboard = () => {

    const {data: totalAmountList, isLoading} = useGetPaymentList()

    // 전체 거래내역을 통한 총 결제 금액, 횟수, 성공률, 취소 비율, 계산 및 차트에 사용될 데이터 가공
    const status = useMemo(() => {
        if (!totalAmountList) return { 
            totalAmount: 0, 
            length: 0, 
            successCount: 0, 
            canceledCount: 0,
            successRate: 0,
            cancelRate: 0,
            doughnutChart: [],
            pieChart: [],
         };
    
        let totalAmount = 0;
        let successCount = 0;
        let canceledCount = 0;

        const counts = {
            ONLINE: 0,
            DEVICE: 0,
            MOBILE: 0,
            VACT: 0,
            BILLING: 0,
        };

        const statusCounts = {
            SUCCESS: 0,
            CANCELLED: 0,
            PENDING: 0,
            FAILED: 0,
        };

        totalAmountList.data.forEach((payment) => {
            totalAmount += Number(payment.amount);
            counts[payment.payType]++;

            statusCounts[payment.status]++;
            if(payment.status === "SUCCESS") successCount++;
            if(payment.status === "CANCELLED") canceledCount++;
        })
                
        const length = totalAmountList.data.length
        const successRate = length > 0 ? (successCount  / length) * 100 : 0;
        const cancelRate = length > 0 ? (canceledCount / length) * 100 : 0;

        const doughnutChart: ChartItem[] = [
            { type: 'ONLINE', label: '온라인', value: counts.ONLINE },
            { type: 'DEVICE', label: '단말기', value: counts.DEVICE },
            { type: 'MOBILE', label: '모바일', value: counts.MOBILE },
            { type: 'VACT', label: '가상계좌', value: counts.VACT },
            { type: 'BILLING', label: '정기결제', value: counts.BILLING },
        ];

        const pieChart: StatusChartItem[] = [
            { status: 'SUCCESS', label: '결제 완료', value: statusCounts.SUCCESS },
            { status: 'CANCELLED', label: '환불 완료', value: statusCounts.CANCELLED },
            { status: 'PENDING', label: '결제 대기', value: statusCounts.PENDING },
            { status: 'FAILED', label: '결제 실패', value: statusCounts.FAILED },
        ];
    
        return {
            totalAmount, 
            length, 
            successCount,
            canceledCount,
            doughnutChart,
            successRate,
            cancelRate,
            pieChart
        };
      }, [totalAmountList]); 

      if (isLoading) return null;

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
                title="결제 성공률"
                value={`${status.successRate}%`}
                />
                <PaymentCard
                title="결제 취소 비율"
                value={`${status.cancelRate}%`}
                />
                
            </RowWrapper>

            <RowWrapper>
            <Doughnutchart
                chartData={status.doughnutChart}
            />

            <PieChart
                chartData={status.pieChart}
            />
            </RowWrapper>

            <RowWrapper>
            <PaymentHistoryTable
            limit={true}
            />
            </RowWrapper>
            
        </DashboardContainer>
    )
}

export default Dashboard;

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