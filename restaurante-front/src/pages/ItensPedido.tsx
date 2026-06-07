import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { ItemPedido, Pedido, Garcom, Cardapio } from '../types';
import { Trash, Edit } from 'lucide-react';

export function ItensPedido() {
  const { data, loading, remove, create, update } = useCrud<ItemPedido>('/itens-pedido');
  const { data: pedidos } = useCrud<Pedido>('/pedidos');
  const { data: garcons } = useCrud<Garcom>('/garcons');
  const { data: cardapios } = useCrud<Cardapio>('/cardapios');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [pedidoId, setPedidoId] = useState('');
  const [garcomId, setGarcomId] = useState('');
  const [cardapioId, setCardapioId] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [valorUnitario, setValorUnitario] = useState('');

  function abrirModalNovo() {
    setPedidoId(''); setGarcomId(''); setCardapioId(''); setQuantidade('1'); setValorUnitario('');
    setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setPedidoId(''); setGarcomId(''); setCardapioId(''); setQuantidade('1'); setValorUnitario('');
    setEditingId(null); setIsModalOpen(false);
  }

  function handleSelecionarPrato(idPrato: string) {
    setCardapioId(idPrato);
    const pratoSelecionado = cardapios.find(c => c.car_codigo === Number(idPrato));
    if (pratoSelecionado) setValorUnitario(pratoSelecionado.car_preco);
  }

  function handleEditar(item: ItemPedido) {
    setPedidoId(String(item.pedido));
    setQuantidade(String(item.item_quantidade));
    setValorUnitario(String(item.item_valorunitario));
    
    // Acha IDs correspondentes
    const gar = garcons.find(g => g.gar_nome === item.garcom);
    setGarcomId(gar ? String(gar.gar_codigo) : '');
    
    const pra = cardapios.find(c => c.car_nome === item.prato);
    setCardapioId(pra ? String(pra.car_codigo) : '');

    setEditingId(item.item_numeroitem); setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!pedidoId || !garcomId || !cardapioId || !quantidade || !valorUnitario) return alert("Preencha todos!");

    const qtd = Number(quantidade);
    const valorUnit = Number(valorUnitario);
    
    const payload = {
      pedido: Number(pedidoId),
      garcom: Number(garcomId),
      cardapio: Number(cardapioId),
      quantidade: qtd,
      valorUnitario: valorUnit,
      valorTotal: qtd * valorUnit
    };

    const sucesso = editingId ? await update(editingId, payload) : await create(payload);
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Itens dos Pedidos</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Lançar Item</button>
      </div>

      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>ID</th><th>Pedido</th><th>Prato</th><th>Garçom</th><th>Qtd</th><th>Valor Unit.</th><th>Subtotal</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.item_numeroitem}>
                <td style={{ color: '#86868B' }}>{item.item_numeroitem}</td>
                <td><span style={{ fontWeight: 600 }}>#{item.pedido}</span></td>
                <td style={{ fontWeight: 500 }}>{item.prato}</td>
                <td>{item.garcom}</td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.item_quantidade}x</td>
                <td style={{ color: '#86868B' }}>{Number(item.item_valorunitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td style={{ fontWeight: 600 }}>{Number(item.item_valortotalitem).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.item_numeroitem)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Item' : 'Lançar Item'}</h3>
            <div className="form-group">
              <label>Pedido</label>
              <select className="apple-input" value={pedidoId} onChange={(e) => setPedidoId(e.target.value)}>
                <option value="">Selecione...</option>
                {pedidos.map(p => <option key={p.ped_numerovenda} value={p.ped_numerovenda}>Pedido #{p.ped_numerovenda}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Garçom</label>
              <select className="apple-input" value={garcomId} onChange={(e) => setGarcomId(e.target.value)}>
                <option value="">Selecione...</option>
                {garcons.map(g => <option key={g.gar_codigo} value={g.gar_codigo}>{g.gar_nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Prato</label>
              <select className="apple-input" value={cardapioId} onChange={(e) => handleSelecionarPrato(e.target.value)}>
                <option value="">Selecione...</option>
                {cardapios.map(c => <option key={c.car_codigo} value={c.car_codigo}>{c.car_nome} (R$ {c.car_preco})</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group" style={{ flex: 1 }}><label>Quantidade</label><input type="number" min="1" className="apple-input" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} /></div>
              <div className="form-group" style={{ flex: 1 }}><label>Valor Unit.</label><input type="number" step="0.01" className="apple-input" value={valorUnitario} onChange={(e) => setValorUnitario(e.target.value)} /></div>
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