import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { FormaPagamento } from '../types';
import { Trash, Edit } from 'lucide-react';

export function FormasPagamento() {
  const { data, loading, remove, create, update } = useCrud<FormaPagamento>('/formas-pagamento');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [forma, setForma] = useState('');

  function abrirModalNovo() {
    setForma(''); setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setForma(''); setEditingId(null); setIsModalOpen(false);
  }

  function handleEditar(item: FormaPagamento) {
    setForma(item.for_forma);
    setEditingId(item.for_codigopagamento);
    setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!forma.trim()) return alert("Preencha o nome!");
    const payload = { forma };
    const sucesso = editingId ? await update(editingId, payload) : await create(payload); 
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Formas de Pagamento</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Nova Forma</button>
      </div>

      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>Código</th><th>Forma de Pagamento</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.for_codigopagamento}>
                <td style={{ fontWeight: 500, color: '#86868B' }}>{item.for_codigopagamento}</td>
                <td><span style={{ background: '#E5E5EA', padding: '6px 12px', borderRadius: '14px', fontSize: '13px', fontWeight: 500 }}>{item.for_forma}</span></td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.for_codigopagamento)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Forma' : 'Nova Forma'}</h3>
            <div className="form-group"><label>Descrição</label><input type="text" className="apple-input" value={forma} onChange={(e) => setForma(e.target.value)} /></div>
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