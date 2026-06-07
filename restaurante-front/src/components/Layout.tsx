import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app-layout">
      <aside className="apple-sidebar">
        <h2>Restaurante</h2>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Visão Geral</Link>
          <Link to="/clientes" className="nav-link">Clientes</Link>
          <Link to="/categorias" className="nav-link">Categorias</Link>
          <Link to="/formas-pagamento" className="nav-link">Pagamentos</Link>
          <Link to="/garcons" className="nav-link">Garçons</Link>
          <Link to="/cardapios" className="nav-link">Cardápio</Link>
          <Link to="/pedidos" className="nav-link">Pedidos</Link>
          <Link to="/itens-pedido" className="nav-link">Itens do Pedido</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}