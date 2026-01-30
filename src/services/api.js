import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = async (pergunta) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/receitas/perguntar`,
      {
        pergunta
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.resposta;

  } catch (err) {
    console.error("Erro ao buscar resposta no servidor:", err);
    throw err;
  }
};
