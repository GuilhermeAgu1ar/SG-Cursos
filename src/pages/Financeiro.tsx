import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { api, addMeses, hoje } from '../services/api';
import { Assinatura, Pagamento, Plano, Usuario } from '../models';

export default function Financeiro() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [planoSel, setPlanoSel] = useState<number | ''>('');
  const [msg, setMsg] = useState('');

  const fetchAll = async () => {
    try {
      const [p, u, a, pg] = await Promise.all([
        api.get('/planos'), api.get('/usuarios'), api.get('/assinaturas'), api.get('/pagamentos'),
      ]);
      setPlanos(p.data); setUsuarios(u.data); setAssinaturas(a.data); setPagamentos(pg.data);
      if (p.data.length > 0 && planoSel === '') setPlanoSel(p.data[0].id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const plano = planos.find(p => p.id === Number(f.get('idPlano')))!;
    setLoadingCheckout(true);
    try {
      const ass = (await api.post('/assinaturas', {
        idUsuario: Number(f.get('idUsuario')), idPlano: plano.id,
        dataInicio: hoje(), dataFim: addMeses(plano.duracaoMeses),
      })).data;
      await api.post('/pagamentos', {
        idAssinatura: ass.id, valorPago: plano.preco, dataPagamento: hoje(),
        metodoPagamento: f.get('metodoPagamento'), idTransacaoGateway: 'TX-' + Date.now(),
      });
      setMsg(`Pagamento de R$ ${plano.preco.toFixed(2)} confirmado com sucesso!`);
      setTimeout(() => setMsg(''), 4000);
      (e.target as HTMLFormElement).reset();
      setPlanoSel(planos[0]?.id ?? '');
      fetchAll();
    } catch (error) {
      console.error(error);
      alert('Erro ao processar pagamento.');
    } finally {
      setLoadingCheckout(false);
    }
  };

  const totalReceita = pagamentos.reduce((s, p) => s + Number(p.valorPago), 0);

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-credit-card text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Financeiro</h1>
            <p className="text-secondary mb-0">Planos de assinatura, checkout e histórico de pagamentos</p>
          </div>
        </div>

        {msg && <div className="alert alert-success d-flex align-items-center gap-2 mb-4"><i className="bi bi-check-circle-fill"></i>{msg}</div>}

        {/* Planos */}
        <h4 className="text-light mb-3"><i className="bi bi-tags me-2"></i>Planos disponíveis</h4>
        <div className="row g-3 mb-4">
          {planos.map(p => (
            <div className="col-md-4" key={p.id}>
              <div
                className={`card bg-dark border text-center p-3 ${planoSel === p.id ? 'border-primary' : 'border-secondary'}`}
                onClick={() => setPlanoSel(p.id)}
                style={{ cursor: 'pointer' }}
              >
                <h5 className="text-light">{p.nome}</h5>
                <p className="text-secondary small">{p.descricao}</p>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0d6efd' }}>R$ {p.preco.toFixed(2)}</div>
                <small className="text-secondary">{p.duracaoMeses} {p.duracaoMeses === 1 ? 'mês' : 'meses'}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Checkout */}
          <div className="col-lg-5">
            <div className="card bg-dark border-secondary">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><i className="bi bi-cart-check me-2"></i>Checkout</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleCheckout}>
                  <div className="mb-3">
                    <label className="form-label text-light">Usuário *</label>
                    <select name="idUsuario" className="form-select bg-secondary text-light border-0" required>
                      <option value="">Selecione um usuário</option>
                      {usuarios.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-light">Plano *</label>
                    <select name="idPlano" className="form-select bg-secondary text-light border-0" required
                      value={planoSel} onChange={e => setPlanoSel(Number(e.target.value))}>
                      {planos.map(p => <option key={p.id} value={p.id}>{p.nome} — R$ {p.preco.toFixed(2)}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-light">Método de pagamento *</label>
                    <select name="metodoPagamento" className="form-select bg-secondary text-light border-0">
                      <option>Pix</option>
                      <option>Cartão de crédito</option>
                      <option>Boleto</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loadingCheckout}>
                    {loadingCheckout ? <><span className="spinner-border spinner-border-sm me-2"></span>Processando...</> : <><i className="bi bi-check-lg me-2"></i>Confirmar pagamento</>}
                  </button>
                </form>
              </div>
            </div>

            <div className="card bg-secondary border-0 mt-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-light">Total de assinaturas</span>
                  <strong className="text-light">{assinaturas.length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-light">Receita total</span>
                  <strong className="text-light">R$ {totalReceita.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico */}
          <div className="col-lg-7">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-receipt me-2"></i>Histórico de pagamentos</h4>
              <span className="badge bg-primary">{pagamentos.length}</span>
            </div>
            {loading ? <div className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></div>
              : pagamentos.length === 0 ? (
                <div className="alert alert-secondary text-center"><i className="bi bi-credit-card me-2"></i>Nenhum pagamento registrado ainda.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th className="text-white">Ass.</th>
                        <th className="text-white">Valor</th>
                        <th className="text-white">Método</th>
                        <th className="text-white">Transação</th>
                        <th className="text-white">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagamentos.map(p => (
                        <tr key={p.id}>
                          <td className="text-secondary">#{p.idAssinatura}</td>
                          <td className="text-success fw-bold">R$ {Number(p.valorPago).toFixed(2)}</td>
                          <td><span className="badge bg-secondary">{p.metodoPagamento}</span></td>
                          <td className="text-secondary" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.idTransacaoGateway}</td>
                          <td className="text-secondary">{p.dataPagamento}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
