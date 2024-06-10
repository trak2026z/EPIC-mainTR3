import styled from 'styled-components';
export const StyledWrapper = styled.div`
    display: flex;
    gap: 2rem;
    .left {
        width: 25%;
        border: 1px solid silver;
        border-radius: 1rem;
        padding: 2rem;
    }
    .right {
        width: calc(75% - 2rem);
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        flex-wrap: wrap;
        .left,
        .right {
            width: 100%;
        }
    }
`;
