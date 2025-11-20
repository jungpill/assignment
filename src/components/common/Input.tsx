import styled from "styled-components"

interface Props {
    label: string
    placeholder: string
    value: string
    onChange: (value:  React.ChangeEvent<HTMLInputElement>) => void;
    name: string
}

const LabelInput = ({
    label,
    placeholder,
    value,
    onChange,
    name
    }: Props) => {

    return(
        <InputWrapper>
            <Label>
                {label}
            </Label>
            <Input
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            />
        </InputWrapper>
    )
}

export default LabelInput

const InputWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto 18px;
    gap: 2px;
    width: 100%;
`

const Label = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #374151;
    margin: 0;
    font-size: 12px;
`

const Input = styled.input`
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid black;
`