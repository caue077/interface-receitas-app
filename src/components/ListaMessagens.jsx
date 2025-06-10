import { useEffect, useRef } from "react";
import Mensagem from "./Mensagem";

const ListaMensagens = ({ mensagens, loading }) => {
    const mensagemRef = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (mensagemRef.current) {
                mensagemRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // pequeno delay para garantir renderização

        return () => clearTimeout(timeout);
    }, [mensagens]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mensagens.map(mensagem => (
                <Mensagem key={mensagem.id} mensagem={mensagem} />
            ))}

            {loading && (
                <div className="flex justify-start">
                    <div className="bg-gray-50 rounded-2xl rounded-bl-none shadow-md border-gray-200 p-2">
                        <div className="flex flex-row space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-100"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* âncora de scroll */}
            <div ref={mensagemRef}></div>
        </div>
    );
};

export default ListaMensagens;
