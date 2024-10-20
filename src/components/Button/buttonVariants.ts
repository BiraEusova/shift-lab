import styles from "./Button.module.css"
import {cva, VariantProps} from "class-variance-authority";

export interface ButtonVariants extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
//export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(styles.button, {
    variants: {
        variant: {
            primary: styles.primary,
            secondary: styles.secondary
        }
    },
    defaultVariants: { variant: "primary"}
})