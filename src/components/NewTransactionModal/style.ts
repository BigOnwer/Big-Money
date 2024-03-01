import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import * as RadioGroup from '@radix-ui/react-radio-group';

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: #00000075;
`
export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem; 
    background: ${props => props.theme['gray-800']};
    
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form{
        margin-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        input{
            border-radius: 6px;
            border: 0;
            background: ${props => props.theme['gray-900']};
            color: ${props => props.theme['gray-300']};
            padding: 1rem;

            &::placeholder{
                color: ${props => props.theme['gray-500']};
            }
        }

        button[type="submit"] {
            height:58px;
            border: 0;
            background: ${props => props.theme['green-500']};
            color: #ffff;
            font-weight: bold;
            padding: 0 1.25rem;
            border-radius: 6px;
            margin-top: 1.5rem;
            cursor: pointer;

            &:disabled{
                opacity: 0.6;
                cursor: not-allowed;
            }

            &:not(:disabled):hover{
                background: ${props => props.theme['green-700']};
                transition: background-color 0.2s;
            }
        }

    }

    header{
        display: flex;
        justify-content: space-between;
    }
`

export const Close = styled(Dialog.Close)`
    color: ${props => props.theme['gray-500']};
    background: transparent;
    border: 0;
    cursor: pointer;
    line-height: 0;
`

export const TransactionType = styled(RadioGroup.Root)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`

interface TransactionTypeButtonProps{
    variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16rem;
    height: 3.625rem;
    gap: 0.5rem;//espaco entre os conteudos do botao

    background: ${props => props.theme['gray-700']};
    border: 0;
    border-radius: 6px;
    color: ${props => props.theme['gray-300']};

    cursor: pointer;

    svg{
        color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
    }

    &:hover{
        background: ${props => props.theme['gray-600']};
        transition: background-color 0.2s;
    }

    &[data-state='checked']{
        color: #ffff;
        background: ${props => props.variant === 'income' ? props.theme['green-700'] : props.theme['red-500']};

        svg{
            color: #ffff;
        }
    }
`