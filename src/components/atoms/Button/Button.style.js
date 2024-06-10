import styled from 'styled-components';

export const StyledButton = styled.button`
    cursor: pointer;
    padding: 0.7rem 1.4rem;
    font-size: 1.5rem;
    line-height: 2.3rem;
    text-align: center;
    border-radius: 4rem;
    position: relative;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    outline: none;
    font-weight: 700;
    text-decoration: none;
    background-color: linear-gradient(#a6a6a6, #666);
    width: 100%;
    color: ${({ theme }) => theme.colors.black};
    &.primary {
        background-color: linear-gradient(#a6a6a6, #666);
        color: ${({ theme }) => theme.colors.black};
        border: 0.1rem solid transparent;
    }
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
