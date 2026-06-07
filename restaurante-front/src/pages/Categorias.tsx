import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { Categoria } from '../types';
import { Trash, Edit } from 'lucide-react';

export function Categorias() {
  const { data, loading, remove, create, update } = useCrud<Categoria>('/categorias');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nome, setNome] = useState('');

  function abrirModalNovo() {
    setNome(''); setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setNome(''); setEditingId(null); setIsModalOpen(false);
  }

  function handleEditar(item: Categoria) {
    setNome(item.cat_nome);
    setEditingId(item.cat_codigo);
    setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!nome.trim()) return alert("Preencha o nome!");
    
    const payload = { nome };
    const sucesso = editingId ? await update(editingId, payload) : await create(payload);
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando dados...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Categorias</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Nova Categoria</button>
      </div>

      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>Código</th><th>Nome da Categoria</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.cat_codigo}>
                <td style={{ fontWeight: 500, color: '#86868B' }}>{item.cat_codigo}</td>
                <td style={{ fontWeight: 500 }}>{item.cat_nome}</td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.cat_codigo)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</h3>
            <div className="form-group">
              <label>Nome da Categoria</label>
              <input type="text" className="apple-input" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={fecharModal}>Cancelar</button>
              <button className="btn-primary" onClick={handleSalvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}