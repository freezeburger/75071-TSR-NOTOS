
import { FC } from 'react';

export interface ButtonProps{
    children:string;
    color:'primary' | 'secondary' | 'danger';
}

const Button:FC<ButtonProps> = ({ children, color}) => {

    return (
        <button className={ 'btn btn-' + color}>
            { children }
        </button>
    );
}

export default Button;