import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface SelectDropdownProps {
  options: string[];
  value?: string;
  placeholder?: string;
  width?: string;
  onChange: (value: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  placeholder = "선택하세요",
  width = "200px",
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = value ?? "";

  return (
    <Wrapper ref={ref} $width={width}>
      <Selector onClick={() => setOpen((prev) => !prev)}>
        <span>
          {selectedLabel || <Placeholder>{placeholder}</Placeholder>}
        </span>
        <Arrow>{open ? "▲" : "▼"}</Arrow>

        {open && (
          <Dropdown>
            {options.map((opt) => (
              <DropdownItem
                key={opt}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt);
                  setOpen(false);
                }}
                $active={opt === value}
              >
                {opt}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </Selector>
    </Wrapper>
  );
};

export default SelectDropdown;

const Wrapper = styled.div<{ $width: string }>`
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  width: ${(p) => p.$width};
  box-sizing: border-box;
  position: relative;
  border-radius: 8px;
  height: 38px;
`;

const Selector = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  flex: 1;
  padding: 4px 8px;
  border-radius: 8px;

  &:hover {
    background-color: #f9fafb;
  }
`;

const Placeholder = styled.span`
  color: #9ca3af;
`;

const Arrow = styled.span`
  margin-left: auto;
  font-size: 10px;
  color: #9ca3af;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 60%;
  left: -10px;
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 4px 0;
  list-style: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
  
`;

const DropdownItem = styled.li<{ $active: boolean }>`
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${(p) => (p.$active ? "#eff6ff" : "transparent")};
  color: ${(p) => (p.$active ? "#1d4ed8" : "#111827")};

  &:hover {
    background-color: #f3f4f6;
  }
`;
