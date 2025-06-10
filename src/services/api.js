// src/services/api.js (ou onde você definiu sua função api)
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = async (pergunta) => {
    try {
        const response = await axios.post(`${API_URL}receitas/perguntar`, {
            pergunta
        });

        return response.data.resposta;

    } catch (err) {
        console.error("Erro ao buscar resposta no servidor", err);
        throw err; // Corrigido: deve ser 'throw err' para lançar o erro capturado.
    }
};