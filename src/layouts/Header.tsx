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
    height: 200px;
    width: 100vw;
    padding: 12px 20px;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin: 0;
`