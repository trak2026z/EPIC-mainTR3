import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    html{
        box-sizing: border-box;
        font-size: 62.5%;
    }
    *,*::after, &::before{
        box-sizing: inherit;
    }
    body{
        font-family: 'Montserrat', sans-serif;
        background: ${({ theme }) => theme.colors.black};
        margin: 0;
        font-size: 1.6rem;
        line-height: 1.3em;
        color: ${({ theme }) => theme.colors.white};
    }
    textarea, a, button{
        font-family: 'Montserrat', sans-serif;
    }
    p{
        margin-bottom: 1rem;
        margin-top: 0;
    }
    img{
        max-width: 100%;
        height: auto;
        width: 100%;
    }
    .mb20{
        margin-bottom: 2rem;
    }
`;
