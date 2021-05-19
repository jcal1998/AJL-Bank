import { useState } from 'react'
import Modal from 'react-modal';
import logoImg from '../../assets/logo.svg'
import logo1Img from '../../assets/logo1.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import closeImg from '../../assets/close.svg'

import { BodyContainer, Content, HeaderContainer, ModalContainer, SummaryContainer, TransactionTableContainer,LoginForm, LoginContainer , SignUp} from './styles'
import { Data } from './Data';

Modal.setAppElement('#root');

interface Transaction{
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: Date,
}

interface AccountProps{
    cpf: string,
    name: string,
    password : string,
    transactions : Transaction[]
}

export function  Account() { 
    const [ isTransactionModalOpen, setIsTransactionModalOpen ] = useState(false);
    const [ modalStep, setModalStep ] = useState(1);
    const [ type, setType ] = useState('');
    const [ pixDestination, setPixDestination ] = useState('');
    const [ ticket, setTicket ] = useState('')
    const [ amount, setAmount ] = useState(0);
    const [ password, setPassword ] = useState('');
    const [ isCanceled, setIsCanceled ] = useState(false);
    const [ createBool, setCreateBool ] = useState(false);
    const [ isPasswordWrong, setIsPasswordWrong ] = useState(false);
    const [ isCpfWrong, setIsCpfWrong ] = useState(false);
    const [ isPixCpfWrong, setIsPixCpfWrong ] = useState(false);
    const [ isTicketWrong, setIsTicketWrong ] = useState(false);
    const [ isNotMoneyEnough, setIsNotMoneyEnough ] = useState(false);
    const [ transactionType, setTransactionType ] = useState('');
    const [ transactionName, setTransactionName ] = useState('');
    const [ step, setStep ] = useState(1);
    const [ bank, setBank ] = useState(Data);
    const [ cpf, setCpf] = useState('');
    const [ currentAccount, setCurrentAccount] = useState<AccountProps>(
        {} as AccountProps
    )

    function handleOpenTransactionModal() {
        setIsTransactionModalOpen(true);
        setPassword('')
    }

    function handleCloseTransactionModal() {
        setIsTransactionModalOpen(false);
        setModalStep(1);
        setIsPasswordWrong(false);
        setIsCpfWrong(false)
        setIsTicketWrong(false)
        setIsPixCpfWrong(false)
        setPixDestination('')
        setIsNotMoneyEnough(false)
        setTicket('')
    }

    function changeStep(e : any) {
        setType(e.target.id)
        if(e.target.id==='deposito') setTransactionType('deposit')
        else setTransactionType('withdraw')

        setModalStep(2)
    }

    function loginAccount(){
        const current = bank.find((account)=>account.cpf === cpf)
        if(current){
            if(current && password===current.password){
                setCurrentAccount(current)
                setStep(2);
                setPassword('')
                setIsPasswordWrong(false)
                setType('')
            }else{
                setIsPasswordWrong(true)
                setPassword('')
            }
        }else{
            setIsCpfWrong(true)
            setCpf('')
            setPassword('')
        }
    }

    function logout() {
        setBank( accounts => {
            const temp = accounts.filter((account)=>account.cpf !== cpf)
            if(type!=="encerramento de conta"){
                temp.push(currentAccount)
            }
            return(
                temp
            )
        })
        setStep(1)
        setCpf('')
        setPassword('')
        setIsCpfWrong(false)
    }

    function createAccount(e : any) {
        e.preventDefault()
        const {name , cpf, password , password2} = e.target
        const current = bank.find((account)=>account.cpf === cpf.value)
        if(!current){
            if(password.value===password2.value){
                const newAccount = {
                    name: name.value,
                    cpf: cpf.value,
                    password: password.value,
                    transactions: []
                }
                handleOpenTransactionModal()
                console.log([...bank, newAccount])
                setBank([...bank, newAccount])
                setCreateBool(true)
                setTimeout(() => setStep(1), 3000);
                setTimeout(() => setCreateBool(false), 6000);
                setTimeout(handleCloseTransactionModal, 6000);
            }else{
                setIsPasswordWrong(true);
            }
        }else{
            setIsCpfWrong(true)
        }
    }

    function cancelsignup() {
        setIsPasswordWrong(false)
        setIsCpfWrong(false)
        setStep(1)
        setCpf('')
        setPassword('')
    }

    function confirmPassword(){
        const summary = currentAccount.transactions.reduce((acc, transaction)=>{
            if(transaction.type==='deposit'){
                acc.total += transaction.amount;
            }else{
                acc.total -= transaction.amount;
            }
    
            return acc;
        },{
            total: 0,
        })  
        if(transactionType==='withdraw' && summary.total<amount){
            setIsNotMoneyEnough(true)
        }else{
            if(password===currentAccount.password){
                if(type==='pagamento'){
                    if(ticket==='123456789'){
                        setModalStep(3)
                        setPassword('')
                        setTicket('')
                        setAmount(167)
                    }else if(ticket==='987654321'){
                        setModalStep(3)
                        setPassword('')
                        setTicket('')
                        setAmount(379)
                    }
                    else{
                        setTicket('')
                        setPassword('')
                        setIsTicketWrong(true)
                    }
                
                }else if(type==="transferencia"){
                    const current = bank.find((account)=>account.cpf === pixDestination)
                    if(current){
                        setModalStep(3)
                        setPassword('')
                    }else{
                        setPixDestination('')
                        setPassword('')
                        setIsPixCpfWrong(true)
                    }
                }else{
                    setModalStep(3)
                    setPassword('')
                }
            }else{
                setIsPasswordWrong(true)
                setPassword('')
            }
        }
    }

    function handleCreateTransaction(value=false) {
        setIsCanceled(!value);
        setModalStep(4)
        if(value!==false){
            if(type==="encerramento de conta"){
                const summary = currentAccount.transactions.reduce((acc, transaction)=>{
                    if(transaction.type==='deposit'){
                        acc.total += transaction.amount;
                    }else{
                        acc.total -= transaction.amount;
                    }
            
                    return acc;
                },{
                    total: 0,
                })  
                if(summary.total!==0){
                    setIsCpfWrong(true)
                    setTimeout(handleCloseTransactionModal, 3000);
                }else{
                    logout()
                    setTimeout(handleCloseTransactionModal, 3000);
                }
            }else{
                const transaction = {
                    title: transactionName,
                    amount,
                    type: transactionType,
                    category: type,
                    createdAt: new Date(),
                }
                const temp = [...currentAccount.transactions, transaction]
                temp.sort( ( a: any, b: any) =>{
                    let x = a.createdAt
                    let y = b.createdAt
                    return x===y ? 0 : x < y ? 1: -1;
                })
                setCurrentAccount( account => ({
                    ...account,
                    transactions: temp
                }))
                if(type==="transferencia"){
                    const current = bank.find((account)=>account.cpf === pixDestination)
                    const pixReceive = {
                        title: `Pix de ${currentAccount.name}`,
                        amount,
                        type: 'deposit',
                        category: "transferencia",
                        createdAt: new Date(),
                    }
                    current?.transactions.push(pixReceive)
                    current?.transactions.sort( ( a: any, b: any) =>{
                        let x = a.createdAt
                        let y = b.createdAt
                        return x===y ? 0 : x < y ? 1: -1;
                    })
                    setBank( accounts => {
                        const temp = accounts.filter((account)=>account.cpf !== cpf)
                        if(current)
                            temp.push(current)
                        return(
                            temp
                        )
                    })
                }
            }
        }setTimeout(handleCloseTransactionModal, 3000);
    }

    if(step===1){
        return(
            <>
                <LoginContainer>
                    <LoginForm isWrong={isPasswordWrong} isCpfWrong={isCpfWrong}>
                        <img src={logo1Img} alt="AJL Bank"/>
                        <h2>Olá, Seja bem vindo</h2>
                        <input placeholder={isCpfWrong? "CPF não encontrado" : "Digite seu CPF"} type="number" maxLength={11}  value={cpf} onChange={(e) => {if(e.target.value.length<12)setCpf(e.target.value); setIsCpfWrong(false) }} />
                        <input placeholder={isPasswordWrong ? "Senha incorreta":"Digite a sua senha" } className="senha" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <button type="button" onClick={()=> loginAccount()}>Login</button>
                        <button type="button" onClick={()=> {setStep(3); setIsCpfWrong(false)}}>Criar nova conta</button>
                    </LoginForm>
                </LoginContainer>
                <Modal 
                    isOpen={isTransactionModalOpen}
                    onRequestClose={handleCloseTransactionModal}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >   
                    {createBool && (<h2>Conta criada com sucesso</h2>)}
                    {!createBool && (<h2>Conta encerrada com sucesso</h2>)}
                </Modal>
            </>
        )
    }

    if(step===3){
        return(
            <>
                <LoginContainer>
                    <SignUp isWrong={isPasswordWrong} onSubmit={(e)=> createAccount(e) }>
                        <h2>Criar nova conta</h2>
                        <input placeholder="Digite seu Nome Completo" type="text" required name="name" onChange={()=> {setIsPasswordWrong(false); setIsCpfWrong(false)}}/>
                        <input placeholder="Digite seu CPF" type="text" maxLength={11} minLength={11} required name="cpf" onChange={()=> {setIsPasswordWrong(false); setIsCpfWrong(false)}}/>
                        {isCpfWrong &&(
                            <h3>CPF já cadastrado, tente novamente</h3>
                        )}
                        <input placeholder="Digite a sua senha" type="password" name="password" required onChange={()=> {setIsPasswordWrong(false); setIsCpfWrong(false)}}/>
                        <input placeholder="Confirme a sua senha" type="password" name="password2" required onChange={()=> {setIsPasswordWrong(false); setIsCpfWrong(false)}}/>
                        {isPasswordWrong && (
                            <h3>Senha não confere, tente novamente</h3>
                        )}
                        <button type="submit">Enviar para análise</button>
                        <button type="button" onClick={cancelsignup}>Voltar</button>
                    </SignUp>
                </LoginContainer>
                <Modal 
                    isOpen={isTransactionModalOpen}
                    onRequestClose={handleCloseTransactionModal}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <h2>Conta enviada para análise</h2>
                </Modal>
            </>
        )
    }

    if(step===2){   
        const summary = currentAccount.transactions.reduce((acc, transaction)=>{
            if(transaction.type==='deposit'){
                acc.deposits += transaction.amount;
                acc.total += transaction.amount;
            }else{
                acc.withdraws += transaction.amount;
                acc.total -= transaction.amount;
            }
    
            return acc;
        },{
            deposits: 0,
            withdraws: 0,
            total: 0,
        })
        const current = bank.find((account)=>account.cpf === pixDestination)
        return(
            <>
                <HeaderContainer>
                    <Content onSubmit={()=>handleCreateTransaction()}>
                        <img src={logoImg} alt="AJL Bank"/>
                        <h1>Olá, {currentAccount.name}</h1>
                        <button type="button" onClick={handleOpenTransactionModal}>
                            Nova operação
                        </button>
                        <Modal 
                            isOpen={isTransactionModalOpen}
                            onRequestClose={handleCloseTransactionModal}
                            overlayClassName="react-modal-overlay"
                            className="react-modal-content"
                        >
                            <button type="button" onClick={handleCloseTransactionModal} className="react-modal-close">
                                <img src={closeImg} alt="Fechar modal" />
                            </button>
                            <ModalContainer isWrong={isPasswordWrong} isTicketWrong={isTicketWrong} isPixCpfWrong={isPixCpfWrong}>
                                {modalStep===1 && (
                                    <>
                                        <h2>Selecione a operação</h2>
                                        <button type="button" id="deposito" onClick={e=>changeStep(e)}>Depósito</button>
                                        <button type="button" id="saque" onClick={e=>changeStep(e)}>Saque</button>
                                        <button type="button" id="pagamento" onClick={e=>changeStep(e)}>Pagamento</button>
                                        <button type="button" id="transferencia" onClick={e=>changeStep(e)}>Transferência</button>
                                        <button type="button" id="encerramento de conta" onClick={e=>changeStep(e)}>Encerrar conta</button>
                                    </>
                                )}
                                {modalStep===2 && type!=="encerramento de conta" && (
                                    <>
                                        <h2>Fazer {type}</h2>
                                        <input placeholder="Nome da operação" onChange={(e) => setTransactionName(e.target.value)} required/>
                                        {type!=='pagamento' && (
                                            <input placeholder="Valor a ser movimentado" type="number" onChange={(e) => {setAmount(Number(e.target.value)); setIsNotMoneyEnough(false)}} required/>
                                        )}
                                        {type==='pagamento' && (
                                            <input placeholder={isTicketWrong? "Boleto inválido" :"Digite o número do boleto"} value={ticket} type="number" className="boleto" onChange={(e) => {setTicket(e.target.value); setIsTicketWrong(false)}} required/>
                                        )}                                        
                                        {isNotMoneyEnough && (
                                            <h3>Saldo insuficiente! Valor disponível na conta: R$ {summary.total}</h3>
                                        )}
                                        {type==='transferencia' && (
                                            <input placeholder={isPixCpfWrong? "CPF não cadastrado" : "CPF do destinatário"} value={pixDestination} className="pix" type="number" maxLength={11} minLength={11} onChange={(e) => {if(e.target.value.length<12)setPixDestination(e.target.value); setIsPixCpfWrong(false)}} required/>
                                        )}
                                        <input placeholder={isPasswordWrong ? "Senha incorreta":"Digite a sua senha" }value={password} className="senha" type="password" required onChange={(e) => {setPassword(e.target.value); setIsPasswordWrong(false)}}/>
                                        <button type="button" onClick={()=> confirmPassword()}>Continuar</button>
                                    </>
                                )}
                                {modalStep===2 && type==="encerramento de conta" && (
                                    <>
                                        <h2>A operação de encerramento de conta excluirá a sua conta do nosso banco, portanto é necessário que o saldo total esteja zerado</h2>
                                        <button type="button" onClick={()=> setModalStep(3)}>Continuar</button>
                                    </>
                                )}
                                {modalStep===3 && (
                                    <>
                                        {type==="encerramento de conta" && (<h2>Deseja mesmo encerrar a sua conta?</h2>)}
                                        {type!=="encerramento de conta" && (<h2>Confirmar {type} de R$ {amount} {type==='transferencia'?`para ${current?.name}`:''}?</h2>)}
                                        <button type="button" onClick={()=> handleCreateTransaction(true)}>Confirmar operação</button>
                                        <button type="button" onClick={()=> handleCreateTransaction(false)}>Cancelar operação</button>
                                    </>
                                )}
                                {modalStep===4 && (
                                    <>
                                        {isCanceled===false && isCpfWrong===false && <h2>Operação de {type} feita com sucesso!! Aguarde...Você será redirecionado</h2>}
                                        {isCanceled===false && isCpfWrong===true && (<><h2>Falha na operação de {type}</h2><h2>Valor disponível na conta : R$ {summary.total}</h2><h2>Por favor, zere a conta</h2></>)}
                                        {isCanceled===true && <h2>Operação de {type} cancelada. Aguarde...Você será redirecionado</h2>}
                                    </>
                                )}
                            </ModalContainer>
                        </Modal>
                    </Content>
                </HeaderContainer>
                <BodyContainer>
                    <SummaryContainer>
                        <div>
                            <header>
                                <p>Entradas</p>
                                <img src={incomeImg} alt="Entradas"/>
                            </header>
                            <strong>
                                {new Intl.NumberFormat('pt-BR',{
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(summary.deposits)}
                            </strong>
                        </div>
                        <div>
                            <header>
                                <p>Saídas</p>
                                <img src={outcomeImg} alt="Saídas"/>
                            </header>
                            <strong>- 
                                {new Intl.NumberFormat('pt-BR',{
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(summary.withdraws)}
                            </strong>
                        </div>
                        <div className="highlight-background">
                            <header>
                                <p>Saldo Total</p>
                                <img src={totalImg} alt="Total"/>
                            </header>
                            <strong>
                                {new Intl.NumberFormat('pt-BR',{
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(summary.total)}
                            </strong>
                        </div>
                    </SummaryContainer>
                    <TransactionTableContainer>
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Valor</th>
                                    <th>Categoria</th>
                                    <th>Data</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentAccount.transactions.map(transaction => (
                                    <tr key={transaction.title}>
                                        <td>{transaction.title}</td>
                                        <td className={transaction.type}>
                                            {new Intl.NumberFormat('pt-BR',{
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(transaction.amount)}
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td className={transaction.type}>
                                            {new Intl.DateTimeFormat('pt-BR').format(transaction.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TransactionTableContainer>
                    <button type="button" onClick={logout}>Log out</button>
                </BodyContainer>
            </>
        )
    }

    return null;
}