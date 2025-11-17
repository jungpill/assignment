import styled from "styled-components"
import { useEffect, useState } from "react"
import { useGetPaymentList } from "../services/api"

const Dashboard = () => {

    return(
        <DashboardContainer>
            dasd
        </DashboardContainer>
    )
}

export default Dashboard

const DashboardContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 22px 30px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "test1 test2 test3 test4"
    "test5 test5"
    "test5 test5";
`