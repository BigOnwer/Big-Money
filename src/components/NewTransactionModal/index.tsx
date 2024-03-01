import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'

import { Close, Content, Overlay, TransactionType, TransactionTypeButton } from "./style";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../constexts/TransactionsContext";

const newTransactionFormSchema = z.object({
    decription: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInput = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const {createTransaction} = useContext(TransactionsContext)

    const {
        register,
        handleSubmit,
        control,
        reset,
    } = useForm<newTransactionFormInput>({
        resolver: zodResolver(newTransactionFormSchema),
    })

    async function handleCreateNewTransaction(data: newTransactionFormInput) {
        const {decription, price, category, type} = data

        await createTransaction({
            decription,
            price,
            category,
            type,
        })

        reset()
    }

    return(
        <Dialog.Portal>
            <Overlay/>

                <Content>
                    <header>
                        <Dialog.Title>Nova transação</Dialog.Title>

                        <Close> <X size={22}/> </Close>
                    </header>

                    <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input type="text" placeholder="Nome" required {...register('decription')}/>
                        <input type="text" placeholder="Preço" required {...register('price', {valueAsNumber: true})}/>
                        <input type="text" placeholder="Categoria" required {...register('category')}/>

                        <Controller
                        control={control}
                        name="type"
                        render={({field}) => {

                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income" required>
                                        <ArrowCircleUp size={24}/>
                                        <strong>Entrada</strong>
                                    </TransactionTypeButton>
                                
                                    <TransactionTypeButton variant="outcome" value="outcome" required>
                                        <ArrowCircleDown size={24}/>
                                        <strong>Saída</strong>
                                    </TransactionTypeButton>
                                
                                </TransactionType>
                            )
                        }}
                        />
                            
                                
                        
                        
                            <button type="submit">Cadastrar</button>
                        
                    </form>
                </Content>
        </Dialog.Portal>
    )
}