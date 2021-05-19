import styled from 'styled-components';

export const HeaderContainer = styled.header`
    background: var(--blue);
`

export const BodyContainer = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.5rem 1rem;

    button{
        font-size: 1rem;
        color: #FFF;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;
        margin-top:20px;
        margin-left:965.4px;
        transition: filter 0.2s;
        
        &:hover{
            filter: brightness(0.9);
        }
    }
`

export const SummaryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: -10rem;

    div{
        background: #FFFFFF;
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header{
            display: flex;
            align-self: center;
            justify-content: space-between;
        }

        strong{
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 500;
            line-height: 3rem;
        }

        &.highlight-background{
            background: var(--green);
            color: #FFF;
        }
    }
`

export const TransactionTableContainer = styled.div`
    margin-top: 4rem;

    table{
        width: 100%;
        border-spacing: 0 0.5rem;

        th{
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td{
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;

            &:first-child{
                color: var(--text-title);
            }

            &.deposit{
                color: var(--green);
            }

            &.withdraw{
                color: var(--red);
            }
        }
    }
`

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 12rem;
    display: flex;
    align-self: center;
    justify-content: space-between;

    h1{
        color: #FFF;
    }

    button{
        font-size: 1rem;
        color: #FFF;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;

        transition: filter 0.2s;
        
        &:hover{
            filter: brightness(0.9);
        }
    }
`

interface LoginContainerProps{
    isWrong: boolean;
    isCpfWrong: boolean;
}

export const LoginContainer = styled.div`
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
`
interface SignUpProps{
    isWrong: boolean;
}

export const SignUp = styled.form<SignUpProps>`
    display: flex;
    flex-direction: column;
    width:100%;
    max-width: 600px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    h3{
        color: red;
        font-size: 1rem;
    }

    input{
        width:100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight:400;
        font-size:1rem;

        &::placeholder{
            color: var(--text-body)
        }

        & + input{
            margin-top: 1rem;
        }

        &.senha{
            border: 1px solid ${(props)=>props.isWrong? 'red' : '#d7d7d7'};

            &::placeholder{
                color: ${(props)=>props.isWrong? 'red' : 'var(--text-body)'}
            }
        }

    }

    button{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #fff;
        border-radius: 0.25rem;
        border:0;
        font-size:1rem;
        font-weight:600;
        margin-top: 1.5rem;

        transition: filter 0.2s;

        & + button{
            margin-top: 0.5rem;
        }

        &:hover{
            filter: brightness(0.9);
        }

    }
`

export const LoginForm = styled.form<LoginContainerProps>`
    display: flex;
    flex-direction: column;
    width:100%;
    max-width: 600px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;

    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    input{
        width:100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        border: 1px solid ${(props)=>props.isCpfWrong? 'red' : '#d7d7d7'};
        background: #e7e9ee;

        font-weight:400;
        font-size:1rem;

        &::placeholder{
            color: ${(props)=>props.isCpfWrong? 'red' : 'var(--text-body)'}
        }

        & + input{
            margin-top: 1rem;
        }

        &.senha{
            border: 1px solid ${(props)=>props.isWrong? 'red' : '#d7d7d7'};

            &::placeholder{
                color: ${(props)=>props.isWrong? 'red' : 'var(--text-body)'}
            }
        }

    }

    button{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #fff;
        border-radius: 0.25rem;
        border:0;
        font-size:1rem;
        font-weight:600;
        margin-top: 1.5rem;

        transition: filter 0.2s;

        & + button{
            margin-top: 0.5rem;
        }

        &:hover{
            filter: brightness(0.9);
        }

    }
`

interface ModalContainerProps{
    isWrong: boolean;
    isTicketWrong: boolean;
    isPixCpfWrong: boolean;
}

export const ModalContainer = styled.form<ModalContainerProps>`
    display: flex;
    flex-direction: column;

    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    h3{
        color: red;
        font-size: 1rem;
    }

    input{
        width:100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight:400;
        font-size:1rem;

        &::placeholder{
            color: var(--text-body);
        }

        & + input{
            margin-top: 1rem;
        }

        &.boleto{
            border: 1px solid ${(props)=>props.isTicketWrong? 'red' : '#d7d7d7'};

            &::placeholder{
                color: ${(props)=>props.isTicketWrong? 'red' : 'var(--text-body)'}
            }
        }
        
        &.pix{
            border: 1px solid ${(props)=>props.isPixCpfWrong? 'red' : '#d7d7d7'};

            &::placeholder{
                color: ${(props)=>props.isPixCpfWrong? 'red' : 'var(--text-body)'}
            }
        }

        &.senha{
            border: 1px solid ${(props)=>props.isWrong? 'red' : '#d7d7d7'};

            &::placeholder{
                color: ${(props)=>props.isWrong? 'red' : 'var(--text-body)'}
            }
        }
    }

    button{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #fff;
        border-radius: 0.25rem;
        border:0;
        font-size:1rem;
        margin-top: 1.5rem;
        font-weight:600;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }

    }
`
