
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Clientes } from './pages/Clientes';
import { Categorias } from './pages/Categorias';
import { FormasPagamento } from './pages/FormasPagamento';
import { Garcons } from './pages/Garcons';
import { Cardapios } from './pages/Cardapios';
import { Pedidos } from './pages/Pedidos';
import { ItensPedido } from './pages/ItensPedido';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h2>Bem-vindo ao Sistema do Restaurante</h2>} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="formas-pagamento" element={<FormasPagamento />} />
        <Route path="garcons" element={<Garcons />} />
        <Route path="cardapios" element={<Cardapios />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="itens-pedido" element={<ItensPedido />} />
      </Route>
    </Routes>
  );
}