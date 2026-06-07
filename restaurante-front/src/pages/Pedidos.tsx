import { useState } from 'react';
import { useCrud } from '../hooks/useCrud';
import type { Pedido, Cliente, FormaPagamento } from '../types';
import { Trash, Edit } from 'lucide-react';

export function Pedidos() {
  const { data, loading, remove, create, update } = useCrud<Pedido>('/pedidos');
  const { data: clientes } = useCrud<Cliente>('/clientes');
  const { data: pagamentos } = useCrud<FormaPagamento>('/formas-pagamento');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [dataPedido, setDataPedido] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [formaPagamentoId, setFormaPagamentoId] = useState('');

  function abrirModalNovo() {
    setDataPedido(''); setValorTotal(''); setNumeroPessoas(''); setClienteId(''); setFormaPagamentoId('');
    setEditingId(null); setIsModalOpen(true);
  }

  function fecharModal() {
    setDataPedido(''); setValorTotal(''); setNumeroPessoas(''); setClienteId(''); setFormaPagamentoId('');
    setEditingId(null); setIsModalOpen(false);
  }

  function handleEditar(item: Pedido) {

    const dataObj = new Date(item.ped_data);
    const dataFormatada = new Date(dataObj.getTime() - (dataObj.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    setDataPedido(dataFormatada);

    setValorTotal(String(item.ped_valortotal));
    setNumeroPessoas(String(item.ped_numeropessoas));

  
    const cli = clientes.find(c => c.cli_nome === item.cliente);
    setClienteId(cli ? String(cli.cli_codigo) : '');

    const form = pagamentos.find(p => p.for_forma === item.forma_pagamento);
    setFormaPagamentoId(form ? String(form.for_codigopagamento) : '');

    setEditingId(item.ped_numerovenda); setIsModalOpen(true);
  }

  async function handleSalvar() {
    if (!dataPedido || !valorTotal || !clienteId || !formaPagamentoId) return alert("Preencha os campos!");

    const dataFormatadaDB = dataPedido.replace('T', ' ');

    const payload = {
      data: dataFormatadaDB,
      valorTotal: Number(valorTotal),
      numeroPessoas: Number(numeroPessoas),
      cliente: Number(clienteId),
      formaPagamento: Number(formaPagamentoId)
    };

    const sucesso = editingId ? await update(editingId, payload) : await create(payload);
    if (sucesso) fecharModal();
  }

  if (loading) return <p style={{ color: '#86868b' }}>Carregando...</p>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Pedidos</h1>
        <button className="btn-primary" onClick={abrirModalNovo}>+ Novo Pedido</button>
      </div>

      <div className="apple-table-container">
        <table className="apple-table">
          <thead><tr><th>Nº</th><th>Data</th><th>Cliente</th><th>Pessoas</th><th>Total</th><th>Pagamento</th><th>Ação</th></tr></thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ped_numerovenda}>
                <td style={{ fontWeight: 500 }}>{item.ped_numerovenda}</td>
                <td>{new Date(item.ped_data).toLocaleString('pt-BR')}</td>
                <td>{item.cliente}</td>
                <td>{item.ped_numeropessoas}</td>
                <td style={{ fontWeight: 500 }}>R$ {item.ped_valortotal}</td>
                <td><span style={{ background: '#F2F2F7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>{item.forma_pagamento}</span></td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditar(item)}><Edit size={18} color="#007AFF" /></button>
                  <button className="btn-icon" onClick={() => remove(item.ped_numerovenda)}><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="apple-modal-overlay">
          <div className="apple-modal">
            <h3>{editingId ? 'Editar Pedido' : 'Abrir Pedido'}</h3>
            <div className="form-group"><label>Data e Hora</label><input type="datetime-local" className="apple-input" value={dataPedido} onChange={(e) => setDataPedido(e.target.value)} /></div>
            
            <div className="form-group">
              <label>Cliente</label>
              <select className="apple-input" value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
                <option value="">Selecione...</option>
                {clientes.map(cli => <option key={cli.cli_codigo} value={cli.cli_codigo}>{cli.cli_nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Pagamento</label>
              <select className="apple-input" value={formaPagamentoId} onChange={(e) => setFormaPagamentoId(e.target.value)}>
                <option value="">Selecione...</option>
                {pagamentos.map(pag => <option key={pag.for_codigopagamento} value={pag.for_codigopagamento}>{pag.for_forma}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group" style={{ flex: 1 }}><label>Pessoas</label><input type="number" className="apple-input" value={numeroPessoas} onChange={(e) => setNumeroPessoas(e.target.value)} /></div>
              <div className="form-group" style={{ flex: 1 }}><label>Total (R$)</label><input type="number" step="0.01" className="apple-input" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} /></div>
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