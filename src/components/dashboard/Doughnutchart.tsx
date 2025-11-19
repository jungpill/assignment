import styled from "styled-components";
import { useMemo, useRef } from "react";
import { Doughnut,getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { type ChartItem } from "../../pages/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend, Title,);

const CHART_COLORS = [
    '#57B5E7',
    '#8DD3C7',
    '#FBBF72',
    '#FC8D62',
    '#CFECC9',
]

interface Props {
    chartData: ChartItem[]
}

const Doughnutchart = ({
    chartData
    }: Props) => {
    
    const chartRef = useRef<ChartJS<'doughnut'>>(null)

    const data = {
        labels: chartData.map((item) => item.label),
        datasets: [
            {
                data: chartData.map((item) => item.value),
                backgroundColor: CHART_COLORS,
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                display: true,
                position: 'right' as const,
                labels: {
                    padding: 20,
                    font: { size: 14 },
                    usePointStyle: true,
                    
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context:any) => {
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

    return(
        <Container>
           
           <ChartWrapper>
             <Doughnut
            ref={chartRef}
            data={data}
            options={options}
            />
           </ChartWrapper>
        </Container>
    )
}

export default Doughnutchart

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 300px;
    box-sizing: border-box;
    background: #fff;
    padding: 12px;
    margin-top: 20px;
    border-radius: 8px;
`

const ChartWrapper = styled.div`
    height: 100%;
    padding: 12px;
`;

const ChartName = styled.h2`
    display: flex;
    font-size: 24px;
    margin: 0 0 10px 22px;
`