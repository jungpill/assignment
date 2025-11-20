import styled from "styled-components";
import { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
    '#35b0e6', 
    '#EF4444', 
    '#F59E0B', 
    '#6B7280', 
];

export interface StatusChartItem {
    status: 'SUCCESS' | 'CANCELLED' | 'PENDING' | 'FAILED';
    label: string;
    value: number;
}

interface Props {
    chartData: StatusChartItem[];
}

export const PieChart: React.FC<Props> = ({ chartData }) => {
    const chartRef = useRef<ChartJS<'pie'>>(null);

    const isEmpty = chartData.every((item) => item.value === 0);

    if (isEmpty) {
        return (
            <Container>
                <ChartTitle>결제 상태 분포</ChartTitle>
                <EmptyState>결제 데이터가 없습니다</EmptyState>
            </Container>
        );
    }

    const data = {
        labels: chartData.map((item) => item.label),
        datasets: [
            {
                data: chartData.map((item) => item.value),
                backgroundColor: CHART_COLORS,
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right' as const,
                labels: {
                    padding: 20,
                    font: { size: 14 },
                    usePointStyle: true,
                    generateLabels: (chart: any) => {
                        const datasets = chart.data.datasets;
                        return chart.data.labels?.map((label: string, i: number) => ({
                            text: `${label}: ${datasets[0].data[i]}건`,
                            fillStyle: CHART_COLORS[i],
                            hidden: false,
                            index: i,
                        })) || [];
                    },
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce(
                            (acc: number, cur: number) => acc + cur,
                            0
                        );
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value}건 (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <Container>
            <ChartTitle>결제 상태 분포</ChartTitle>
            <ChartWrapper>
                <Pie ref={chartRef} data={data} options={options} />
            </ChartWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 47%;
    height: 300px;
    box-sizing: border-box;
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-left: auto;
`;

const ChartTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 16px 0;
`;

const ChartWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
`;

const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: #9ca3af;
    font-size: 15px;
`;

