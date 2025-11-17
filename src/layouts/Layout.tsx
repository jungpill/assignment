import styled from "styled-components";
import Header from "./Header";

const Layout = () => {

    return(
        <>
            <Header/>
            <LayoutContainer/>
        </>
    )
}

export default Layout

const LayoutContainer = styled.div`
    display: flex;
    height: calc(100vh - 200px);
    box-sizing: border-box;
`