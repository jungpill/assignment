import styled from "styled-components";

const Header = () => {

    return(
        <HeaderLayout>
            <Title>
                대시보드
            </Title>
        </HeaderLayout>
    )
}

export default Header;

const HeaderLayout = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    width: 100vw;
    padding: 12px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #E5E7EB;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin: 0;
`