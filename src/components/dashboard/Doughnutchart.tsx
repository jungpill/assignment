import styled from "styled-components";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title,);

const chartColor = [
    '#57B5E7',
    '#8DD3C7',
    '#FBBF72',
    '#FC8D62',
    '#CFECC9',
]

const Doughnutchart = () => {

    

    return(
        <Container>

        </Container>
    )
}

export default Doughnutchart

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    box-sizing: border-box;
`