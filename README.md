# Serviço de Pagamento

Implementação de uma classe JavaScript para gerenciar pagamentos com armazenamento de histórico.

## Funcionalidades

- **Realizar Pagamento**: Adiciona um novo pagamento à lista de histórico
- **Categorização Automática**: Classifica pagamentos como 'cara' (>100) ou 'padrão' (≤100)
- **Consultar Último Pagamento**: Retorna o pagamento mais recente realizado

## Instalação

```bash
npm install
```

## Testes

Execute os testes com:

```bash
npm test
```

## Uso

```javascript
const ServicoDePagamento = require('./src/ServicoDePagamento');

const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
console.log(servicoDePagamento.consultarUltimoPagamento());

// Output:
// {
//   codigoBarras: '0987-7656-3475',
//   empresa: 'Samar',
//   valor: 156.87,
//   categoria: 'cara'
// }
```

## Estrutura do Projeto

```
.
├── src/
│   └── ServicoDePagamento.js
├── test/
│   └── ServicoDePagamento.test.js
├── package.json
├── .gitignore
└── README.md
```

## Propriedades do Pagamento

Cada pagamento contém as seguintes propriedades:

- `codigoBarras` (string): Código de barras do pagamento
- `empresa` (string): Nome da empresa beneficiária
- `valor` (number): Valor do pagamento
- `categoria` (string): 'cara' se valor > 100, 'padrão' caso contrário
