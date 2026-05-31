const pagamentosRealizados = [];

class ServicoDePagamento {
  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    const novoPagamento = {
      codigoBarras: codigoBarras,
      empresa: empresa,
      valor: valor,
      categoria: '' 
    };

    if (valor > 100) {
      novoPagamento.categoria = 'cara';
    } else {
      novoPagamento.categoria = 'padrão';
    }

    this.pagamentos.push(novoPagamento);

    pagamentosRealizados.push(novoPagamento);
  }

  consultarUltimoPagamento() {
    if (this.pagamentos.length === 0) {
      return null;
    }

    const indiceUltimoPagamento = this.pagamentos.length - 1;

    return this.pagamentos[indiceUltimoPagamento];
  }

  listarTodosPagamentos() {
    return this.pagamentos;
  }

  obterQuantidadePagamentos() {
    return this.pagamentos.length;
  }
}

module.exports = ServicoDePagamento;
