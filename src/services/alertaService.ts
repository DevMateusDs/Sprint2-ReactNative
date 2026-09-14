import { api } from './api';
import { AlertaSeguranca } from '../types/Registro';

export const alertaService = {
  listar: async (): Promise<AlertaSeguranca[]> => {
    const response = await api.get('/alertas');
    return response.data;
  },
  buscarPorId: async (id: number): Promise<AlertaSeguranca> => {
    const response = await api.get(`/alertas/${id}`);
    return response.data;
  },
  criar: async (alerta: Omit<AlertaSeguranca, 'id'>): Promise<AlertaSeguranca> => {
    const response = await api.post('/alertas', alerta);
    return response.data;
  },
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/alertas/${id}`);
  }
};