import { ComponentPropsWithoutRef } from 'react';
import {ButtonVariants, buttonVariants} from "./buttonVariants.ts";

type ButtonProps = ComponentPropsWithoutRef<'button'> &
    ButtonVariants & {
    variant?: 'primary' | 'secondary'
}
const Button = ({children, variant, className, ...props}: ButtonProps) => {

    return (
        <button className={ buttonVariants ({ variant, className })} {...props} >
            {children}
        </button>
    );
};

export default Button;