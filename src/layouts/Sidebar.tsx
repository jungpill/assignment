import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarStore, type Menu } from "../stores/useSidebarStore";

const MENUS = [
  { label: "대시보드", path: "/" },
  { label: "매장관리", path: "/merchants-list" },
  { label: "결제내역", path: "/payment-list" },
] as const;

const Sidebar = () => {

    const navigate = useNavigate()

    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
    <SidebarWrapper>
      {MENUS.map((m) => {
        const selected = location.pathname === m.path;

        return (
          <MenuItem
            key={m.label}
            $selected={selected}
            onClick={() => handleClick(m.path)}
          >
            {m.label}
          </MenuItem>
        );
      })}
    </SidebarWrapper>
  );
}

export default Sidebar

const SidebarWrapper = styled.div`
    display: flex;
    max-width: 250px;
    width: 250px;
    flex-direction: column;
    gap: 6px;
`;

const MenuItem = styled.div<{ $selected: boolean }>`
    display: flex;
    height: 45px;
    font-size: 22px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    box-sizing: border-box;
    color: ${(props) => (props.$selected ? "#3B82F6" : "#000")};
    background: ${(props) => (props.$selected ? "#EBF2FE" : "#fff")};
`;