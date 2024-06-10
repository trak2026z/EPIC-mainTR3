import React from 'react';
import { StyledButton } from './Button.style';

const Button = ({ children, onClickFunction, primary }) => {
    return (
        <StyledButton
            onClick={onClickFunction}
            className={primary ? 'primary' : null}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
