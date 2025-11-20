import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarStore, type Menu } from "../stores/useSidebarStore";

const MENUS = ['대시보드', '매장관리', '결제내역'] as const;

const Sidebar = () => {

    const menu = useSidebarStore(p => p.item)
    const setMenu = useSidebarStore(p => p.setItem)

    const navigate = useNavigate()

    const handleClick = (e:React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const value = target.dataset.menu as Menu | undefined;
        
        if (!value) return;

        setMenu(value);
        if(value === '대시보드') navigate('/')
        if(value === '매장관리') navigate('/merchants-list')
        if(value === '결제내역') navigate('/payment-list')
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
    max-width: 250px;
    width: 250px;
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