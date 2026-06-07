import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { Cardapio, Categoria } from '../types';
import { Trash, Edit } from 'lucide-react';

export function Cardapios() {
  const { data, loading, remove, create, update } = useCrud<Cardapio>('/cardapios');
  const { data: categorias } = useCrud<Categoria>('/categorias');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [unidade, setUnidade] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  function abrirModalNovo() {
    setNome(''); setPreco(''); setUnidade(''); setCategoriaId('');
    setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setNome(''); setPreco(''); setUnidade(''); setCategoriaId('');
    setEditingId(null); setIsModalOpen(false);
  }

  function handleEditar(item: Cardapio) {
    setNome(item.car_nome);
    setPreco(String(item.car_preco));
    setUnidade(item.car_unidade);
  
    
    const cat = categorias.find(c => c.cat_nome === item.categoria);
    setCategoriaId(cat ? String(cat.cat_codigo) : '');

    setEditingId(item.car_codigo); setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!nome || !preco || !categoriaId) return alert("Preencha obrigatórios!");
    
    const payload = { nome, preco: Number(preco), unidade, categoria: Number(categoriaId) };
    const sucesso = editingId ? await update(editingId, payload) : await create(payload);
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Cardápio</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Novo Prato</button>
      </div>

      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>Prato</th><th>Categoria</th><th>Unidade</th><th>Preço</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.car_codigo}>
                <td style={{ fontWeight: 600 }}>{item.car_nome}</td>
                <td><span style={{ background: '#E8F2FF', color: '#007AFF', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{item.categoria}</span></td>
                <td style={{ color: '#86868B' }}>{item.car_unidade}</td>
                <td style={{ fontWeight: 500 }}>{Number(item.car_preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.car_codigo)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Prato' : 'Cadastrar Prato'}</h3>
            <div className="form-group"><label>Nome</label><input type="text" className="apple-input" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
            <div className="form-group"><label>Preço (R$)</label><input type="number" step="0.01" className="apple-input" value={preco} onChange={(e) => setPreco(e.target.value)} /></div>
            <div className="form-group"><label>Unidade</label><input type="text" className="apple-input" value={unidade} onChange={(e) => setUnidade(e.target.value)} /></div>
            <div className="form-group">
              <label>Categoria</label>
              <select className="apple-input" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                <option value="">Selecione...</option>
                {categorias.map(cat => <option key={cat.cat_codigo} value={cat.cat_codigo}>{cat.cat_nome}</option>)}
              </select>
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