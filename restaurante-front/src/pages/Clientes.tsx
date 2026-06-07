import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { Cliente } from '../types';
import { Trash, Edit } from 'lucide-react';

export function Clientes() {
  const { data, loading, remove, create, update } = useCrud<Cliente>('/clientes');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  function abrirModalNovo() {
    setNome(''); setCpf(''); setTelefone(''); setEmail(''); setDataNascimento('');
    setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setNome(''); setCpf(''); setTelefone(''); setEmail(''); setDataNascimento('');
    setEditingId(null); setIsModalOpen(false);
  }

  function handleEditar(item: Cliente) {
    setNome(item.cli_nome); setCpf(item.cli_cpf);
    setTelefone(item.cli_telefone); setEmail(item.cli_email);
    
    const dataFormatada = new Date(item.cli_datanascimento).toISOString().split('T')[0];
    setDataNascimento(dataFormatada);
    
    setEditingId(item.cli_codigo); setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!nome || !cpf || !email) return alert("Preencha Nome, CPF e Email!");
    
    const payload = { nome, cpf, telefone, email, dataNascimento };
    const sucesso = editingId ? await update(editingId, payload) : await create(payload);
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Clientes</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Novo Cliente</button>
      </div>

      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>Nome</th><th>CPF</th><th>Telefone</th><th>Email</th><th>Nascimento</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.cli_codigo}>
                <td style={{ fontWeight: 500 }}>{item.cli_nome}</td>
                <td style={{ color: '#86868B' }}>{item.cli_cpf}</td>
                <td>{item.cli_telefone}</td>
                <td>{item.cli_email}</td>
                <td>{new Date(item.cli_datanascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.cli_codigo)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Cliente' : 'Cadastrar Cliente'}</h3>
            <div className="form-group"><label>Nome</label><input type="text" className="apple-input" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
            <div className="form-group"><label>CPF</label><input type="text" className="apple-input" value={cpf} onChange={(e) => setCpf(e.target.value)} maxLength={14} /></div>
            <div className="form-group"><label>Telefone</label><input type="text" className="apple-input" value={telefone} onChange={(e) => setTelefone(e.target.value)} /></div>
            <div className="form-group"><label>Email</label><input type="email" className="apple-input" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="form-group"><label>Data Nascimento</label><input type="date" className="apple-input" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} /></div>
            
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