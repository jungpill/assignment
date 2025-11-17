import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {

    return(
        <>
            <Header/>
            <LayoutContainer>
                <Sidebar/>
                <Outlet/>
            </LayoutContainer>
        </>
    )
}

export default Layout

const LayoutContainer = styled.div`
    display: flex;
    height: calc(100vh - 80px);
    width: calc(100vw - 200px)px;
    box-sizing: border-box;
`