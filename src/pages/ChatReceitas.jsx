import { useState } from "react"
import ListaMessagens from "../components/ListaMessagens"
import ChatBox from "../components/ChatBox"
import { api } from "../services/api"

const ChatReceitas = () => {
    const [loading, setLoading] = useState(false)
    const [mensagens, setMensagens] = useState([
        {
            id: 1,
            text: "Ola sou seu assistente de receitas, como posso ajudar você?",
            remetente: 'bot'
        },
    ])

    const onEnviarMensagens = async (mensagem) => {
        const novaMensagemUsuario = {
            id: Date.now(),
            text: mensagem,
            remetente: "usuario"
        }

        setMensagens(prev => [...prev, novaMensagemUsuario])
        setLoading(true)

        try {
            const resposta = await api(mensagem)

            const novaMensagemBot = {
                id: Date.now() + 1,
                text: resposta,
                remetente: "bot"
            }

            setMensagens(prev => [...prev, novaMensagemBot])
        } catch (err) {
            const novaMensagem = {
                id: Date.now(),
                text: 'Falha ao enviar',
                remetente: "bot"
            }

            setMensagens(prev => [...prev, novaMensagem])
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-gray-50 to-emerald-50 p-4">
            <div className="container mx-auto max-w-4xl">
                <header className="text-center mb-5">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 text-transparent bg-clip-text mb-2">Caue Chef IA</h1>
                    <p className="text-gray-600 text-lg">Seu assistente pessoal para receitas deliciosas</p>
                </header>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl h-[500px] border border-gray-100 flex flex-col">
                    <ListaMessagens mensagens={mensagens} loading={loading} />
                    <ChatBox onEnviarMensagens={onEnviarMensagens} disable={loading} />
                </div>
            </div>
        </div>
    )

}

export default ChatReceitas