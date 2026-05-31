const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {
  let servicoDePagamento;

  beforeEach(() => {
    servicoDePagamento = new ServicoDePagamento();
  });

  describe('Cenários de testes para a função de pagar', () => {
    it('Deve adicionar um pagamento à lista', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      assert.equal(servicoDePagamento.pagamentos.length, 1);
    });

    it('Deve adicionar categoria "cara" quando valor > 100', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      const pagamento = servicoDePagamento.pagamentos[0];
      assert.equal(pagamento.categoria, 'cara');
    });

    it('Deve adicionar categoria "padrão" quando valor <= 100', () => {
      servicoDePagamento.pagar('1234-5678-9012', 'Empresa', 50.00);
      const pagamento = servicoDePagamento.pagamentos[0];
      assert.equal(pagamento.categoria, 'padrão');
    });

    it('Deve adicionar categoria "padrão" quando valor é exatamente 100', () => {
      servicoDePagamento.pagar('1234-5678-9012', 'Empresa', 100.00);
      const pagamento = servicoDePagamento.pagamentos[0];
      assert.equal(pagamento.categoria, 'padrão');
    });

    it('Deve armazenar todas as propriedades do pagamento', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      const pagamento = servicoDePagamento.pagamentos[0];
      
      assert.equal(pagamento.codigoBarras, '0987-7656-3475');
      assert.equal(pagamento.empresa, 'Samar');
      assert.equal(pagamento.valor, 156.87);
    });

    it('Deve permitir múltiplos pagamentos', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      servicoDePagamento.pagar('1234-5678-9012', 'Empresa', 50.00);
      servicoDePagamento.pagar('5555-6666-7777', 'Outra', 200.00);
      
      assert.equal(servicoDePagamento.pagamentos.length, 3);
    });
  });

  describe('Cenários de testes para a função de consultarUltimoPagamento()', () => {
    it('Deve retornar null quando não há pagamentos', () => {
      const resultado = servicoDePagamento.consultarUltimoPagamento();
      assert.equal(resultado, null);
    });

    it('Deve retornar o último pagamento realizado', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      const resultado = servicoDePagamento.consultarUltimoPagamento();
      
      assert.equal(resultado.codigoBarras, '0987-7656-3475');
      assert.equal(resultado.empresa, 'Samar');
      assert.equal(resultado.valor, 156.87);
      assert.equal(resultado.categoria, 'cara');
    });

    it('Deve retornar apenas o último pagamento quando há múltiplos', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      servicoDePagamento.pagar('1234-5678-9012', 'Empresa', 50.00);
      servicoDePagamento.pagar('5555-6666-7777', 'Outra', 200.00);
      
      const resultado = servicoDePagamento.consultarUltimoPagamento();
      
      assert.equal(resultado.codigoBarras, '5555-6666-7777');
      assert.equal(resultado.empresa, 'Outra');
      assert.equal(resultado.valor, 200.00);
      assert.equal(resultado.categoria, 'cara');
    });

    it('Deve retornar pagamento com estrutura correta', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      const resultado = servicoDePagamento.consultarUltimoPagamento();
      
      assert.equal(resultado.hasOwnProperty('codigoBarras'), true);
      assert.equal(resultado.hasOwnProperty('empresa'), true);
      assert.equal(resultado.hasOwnProperty('valor'), true);
      assert.equal(resultado.hasOwnProperty('categoria'), true);
    });
  });
});
