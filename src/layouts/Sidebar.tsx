import styled from "styled-components";

const Sidebar = () => {

    return(
        <SidebarWrapper>
            <Menu>대시보드</Menu>
            <Menu>일단 해봄</Menu>
        </SidebarWrapper>
    )
}

export default Sidebar

const SidebarWrapper = styled.div`
    display: flex;
    max-width: 150px;
    width: 150px;
    flex-direction: column;
`

const Menu = styled.div`

`