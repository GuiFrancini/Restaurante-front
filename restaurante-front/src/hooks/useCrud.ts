import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useCrud<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoint);
      const actualData = Array.isArray(response.data) && Array.isArray(response.data[0]) 
        ? response.data[0] 
        : response.data;
      setData(actualData);
    } catch (error) {
      console.error(`Erro ao buscar dados de ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const create = async (payload: unknown) => {
    try {
      await api.post(endpoint, payload);
      await loadData(); 
      return true; 
    } catch (error) {
      console.error(`Erro ao criar em ${endpoint}:`, error);
      alert('Erro ao salvar. Verifique os dados.');
      return false;
    }
  };

  // --- NOVA FUNÇÃO DE ATUALIZAÇÃO (PUT) ---
  const update = async (id: number, payload: unknown) => {
    try {
      await api.put(`${endpoint}/${id}`, payload);
      await loadData();
      return true;
    } catch (error) {
      console.error(`Erro ao atualizar em ${endpoint}:`, error);
      alert('Erro ao atualizar. Verifique os dados.');
      return false;
    }
  };

  const remove = async (id: number) => {
    if (window.confirm('Deseja realmente excluir este registro?')) {
      try {
        await api.delete(`${endpoint}/${id}`);
        await loadData();
      } catch (error) {
        console.error(`Erro ao excluir em ${endpoint}:`, error);
        alert('Erro ao excluir. Verifique dependências.');
      }
    }
  };

  return { data, loading, remove, create, update }; // Exportamos o update
}