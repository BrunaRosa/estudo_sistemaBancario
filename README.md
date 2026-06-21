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

Gerar um relatório de testes localmente:

```bash
npm run test:report
```

## Integração Contínua (CI)

Este projeto inclui uma pipeline GitHub Actions configurada em `.github/workflows/ci.yml`.

A pipeline contempla:

- `push` para os branches `main` e `master`
- execução manual via `workflow_dispatch`
- execução agendada diária (`cron`)
- geração de relatório de testes em `test-results/`
- upload do relatório como artefato da pipeline

### Como funciona

1. `actions/checkout@v4` baixa o repositório.
2. `actions/setup-node@v4` configura o ambiente Node.js.
3. `npm ci` instala dependências com base em `package-lock.json`.
4. `npm run test:report` executa os testes usando o `mochawesome`.
5. `actions/upload-artifact@v4` publica os resultados de `test-results/` como artefato.

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
