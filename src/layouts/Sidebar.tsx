import styled from "styled-components";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

type Menu = '대시보드' | '매장관리'
const MENUS = ['대시보드', '매장관리'] as const;

const Sidebar = () => {

    
    const navigate = useNavigate()

    const [menu, setMenu] = useState<Menu>('대시보드')

    const handleClick = (e:React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const value = target.dataset.menu as Menu | undefined;

        if (!value) return;

        setMenu(value);
        if(value === '대시보드') navigate('/')
        else navigate('/merchants-list')
    }

    return(
        <SidebarWrapper onClick={handleClick}>
            {MENUS.map(m => (
            <MenuItem
            key={m}
            $selected={menu !== m}
            data-menu={m}  
            >
            {m}
            </MenuItem>
            ))}
        </SidebarWrapper>
    )
}

export default Sidebar

const SidebarWrapper = styled.div`
    display: flex;
    max-width: 200px;
    width: 200px;
    flex-direction: column;
    gap: 6px;
`

const MenuItem = styled.div<{$selected: boolean}>`
    display: flex;
    height: 45px;
    font-size: 22px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    box-sizing: border-box;
    color: ${props => props.$selected ? '#000' : '#3B82F6'};
    background: ${props => props.$selected ? 'fff' : '#EBF2FE'};
`