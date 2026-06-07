import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { Garcom } from '../types';
import { Trash, Edit } from 'lucide-react';

export function Garcons() {
  const { data, loading, remove, create, update } = useCrud<Garcom>('/garcons');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState('');

  function abrirModalNovo() {
    setNome(''); setHorario(''); setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setNome(''); setHorario(''); setEditingId(null); setIsModalOpen(false);
  }

  function handleEditar(item: Garcom) {
    setNome(item.gar_nome); setHorario(item.gar_horariotrabalho);
    setEditingId(item.gar_codigo); setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!nome || !horario) return alert("Preencha todos os campos!");
    const payload = { nome, horario };
    const sucesso = editingId ? await update(editingId, payload) : await create(payload);
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Equipe (Garçons)</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Novo Garçom</button>
      </div>
      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>Código</th><th>Nome</th><th>Horário</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.gar_codigo}>
                <td style={{ color: '#86868B' }}>{item.gar_codigo}</td>
                <td style={{ fontWeight: 500 }}>{item.gar_nome}</td>
                <td><span style={{ background: '#F2F2F7', padding: '4px 10px', borderRadius: '8px', fontSize: '13px' }}>{item.gar_horariotrabalho}</span></td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.gar_codigo)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Garçom' : 'Cadastrar Garçom'}</h3>
            <div className="form-group"><label>Nome</label><input type="text" className="apple-input" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
            <div className="form-group"><label>Horário</label><input type="text" className="apple-input" value={horario} onChange={(e) => setHorario(e.target.value)} /></div>
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