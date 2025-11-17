import styled from "styled-components";
import React,{ useState } from "react";

type Menu = '대시보드' | '일단 해봄'

const Sidebar = () => {

    const MENUS = ['대시보드', '일단 해봄'] as const;

    const [menu, setMenu] = useState<Menu>('대시보드')

    const handleClick = (e:React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const value = target.dataset.menu as Menu | undefined;

        if (!value) return;

        setMenu(value);
    }

    return(
        <SidebarWrapper onClick={handleClick}>
            {MENUS.map(m => (
            <MenuItem
            key={m}
            $selected={menu !== m}
            onClick={() => setMenu(m)}
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
    max-width: 150px;
    width: 150px;
    flex-direction: column;
    gap: 6px;
`

const MenuItem = styled.div<{$selected: boolean}>`
    display: flex;
    height: 45px;
    font-size: 22px;
    cursor: pointer;
    align-items: center;
    padding: 10px 12px;
    box-sizing: border-box;
    color: ${props => props.$selected ? '#000' : '#3B82F6'};
    background: ${props => props.$selected ? 'fff' : '#EBF2FE'};
`