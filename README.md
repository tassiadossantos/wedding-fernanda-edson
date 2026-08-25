# Wedding App — Fernanda & Edson

Convite digital de casamento em formato PWA (Progressive Web App) com funcionalidade de mural de recados, lista de presentes e confirmação de presença conectados ao Firebase Firestore.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estilo | Tailwind CSS v4 |
| Animações | Framer Motion |
| Ícones | Lucide React |
| Formulários | React Hook Form + Zod |
| QR Code | qrcode.react |
| Backend | Firebase (Firestore) |
| Testes | Vitest + Testing Library |

---

## Funcionalidades

- **Hero** — Nomes dos noivos, contagem regressiva, botões de calendário
- **Nossa História** — Linha do tempo com marcos do relacionamento
- **RSVP** — Formulário de confirmação de presença com validação
- **Locais** — Cerimônia e Recepção com links para Maps/Waze
- **Lista de Presentes** — 26 itens com reserva por convidado
- **Mural de Recados** — Carrossel automático com mensagens dos convidados
- **Código de Vestimenta** — Paleta de cores lavanda e orientações
- **Painel Admin** — Dashboard para visualizar confirmações

---

## Pré-requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- Conta no [Firebase Console](https://console.firebase.google.com/)

---

## Configuração do Firebase

### Projeto atual

| Campo | Valor |
|-------|-------|
| Nome | casamento-fernanda-edson |
| Project ID | `casamento-fernanda-edson0210` |
| Auth Domain | `casamento-fernanda-edson0210.firebaseapp.com` |

### 1. Criar projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Nome: `casamento-fernanda-edson`
4. Clique em **"Criar projeto"**

### 2. Criar o banco Firestore

1. No menu lateral, clique em **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de produção"**
4. Escolha a região mais próxima
5. Clique em **"Criar"**

### 3. Deploy das regras

```bash
# Faça login no Firebase
firebase login

# Deploy das regras
firebase deploy --only firestore:rules
```

### 4. Credenciais

As credenciais estão em `src/lib/firebase.ts`:

```ts
const firebaseConfig = {
  apiKey: "AIzaSyCuAbU3qshrk8ZYv8g2o5823teYmcsqeA",
  authDomain: "casamento-fernanda-edson0210.firebaseapp.com",
  projectId: "casamento-fernanda-edson0210",
  storageBucket: "casamento-fernanda-edson0210.firebasestorage.app",
  messagingSenderId: "405228262970",
  appId: "1:405228262970:web:08e9f813b8a1cc169f0703"
};
```

---

## Estrutura do Projeto

```
wedding-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── Guestbook.test.ts
│   │   ├── Admin.tsx            # Painel administrativo
│   │   ├── AudioPlayer.tsx      # Player de música de fundo
│   │   ├── DressCode.tsx        # Paleta lavanda + dress code
│   │   ├── Footer.tsx           # Rodapé com monograma F&E
│   │   ├── GiftList.tsx         # Lista de presentes com reserva
│   │   ├── Guestbook.tsx        # Mural de recados
│   │   ├── Hero.tsx             # Hero com contagem regressiva
│   │   ├── Locations.tsx        # Cerimônia + Recepção
│   │   ├── Navigation.tsx       # Menu fixo com scroll spy
│   │   ├── RSVP.tsx             # Formulário de confirmação
│   │   └── Timeline.tsx         # Linha do tempo do namoro
│   ├── hooks/
│   │   ├── useAudioPlayer.ts
│   │   └── useCountdown.ts
│   ├── lib/
│   │   ├── calendar.ts          # Google Calendar + .ics
│   │   ├── config.ts            # Configurações do casamento
│   │   ├── firebase.ts          # Inicialização do Firebase
│   │   ├── gifts.ts             # CRUD Firestore (presentes)
│   │   ├── guestbook.ts         # CRUD Firestore (recados)
│   │   └── rsvp.ts              # CRUD Firestore (confirmações)
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                # Tema Tailwind (paleta lavanda)
├── firebase.json
├── firestore.rules
├── .firebaserc
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Build de produção com TypeScript |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Executa o linter (Oxlint) |
| `npm run test` | Executa testes em watch mode |
| `npm run test:run` | Executa testes uma vez |

---

## Configuração

Edite `src/lib/config.ts` para personalizar:

| Campo | Descrição |
|-------|-----------|
| `couple.partner1 / partner2` | Nomes dos noivos |
| `couple.initials` | Iniciais (F&E) |
| `event.date` | Data e hora do casamento |
| `event.ceremony` | Local, endereço e horário da cerimônia |
| `event.reception` | Local, endereço e horário da recepção |
| `gifts` | Lista de presentes (id, nome, categoria) |
| `whatsapp` | Número do WhatsApp |
| `heroImage` | URL da imagem de fundo do hero |

---

## Paleta de Cores (Lavanda)

| Cor | Hex | Uso |
|-----|-----|-----|
| Lavanda | `#C4A8FF` | Cor principal |
| Lavanda Claro | `#E8DAFC` | Fundos suaves |
| Lavanda Profundo | `#6B4EC9` | Destaques |
| Cream | `#FDF6EE` | Fundo geral |
| Sage | `#9CAD8F` | Contraste natural |
| Dourado | `#D4AF37` | Detalhes elegant |

---

## Painel Administrativo

### Acesso

1. Acesse: `https://seu-site.com/#/admin`
2. Digite a senha

### Senha atual

`FernandaEdson0210`

Para alterar, edite `src/components/Admin.tsx`:

```ts
const ADMIN_PASSWORD = 'sua_nova_senha';
```

### Funcionalidades

- **Resumo:** Total de confirmações, quantos vão, não vão e total de convidados
- **Filtros:** Abas "Todos", "Vão" e "Não vão"
- **Cards:** Nome, badge colorido, acompanhantes, restrições alimentares, mensagem e data

---

## Lista de Presentes

### Itens (26 total)

| Categoria | Itens |
|-----------|-------|
| Cozinha | Cafeteira, Aparelho de jantar, Jogo de copos, Faqueiro, Jogo de panelas, Jogo de pratos, Panos de prato, Toalha de mesa, Vasilhas plásticas, Jarras de suco, Liquidificador, Garrafa de café, Garrafas de água, Fruteira, Potes para mantimentos |
| Quarto | Jogo de lençol casal, Jogo de lençol solteiro, Travesseiros |
| Banheiro | Conjunto tapetes banheiro, Jogo de toalha banheiro |
| Sala | Tapetes para casa, Mantas para sofá, Ventilador, Almofadas, Cortinas |
| Limpeza | Pano de chão |

### Funcionalidade

- Convidados filtram por categoria
- Reservam itens inserindo seu nome
- Itens reservados ficam marcados e riscados
- Prevenção de duplicatas via Firestore

---

## Deploy

### Vercel (utilizado)

O projeto está configurado para deploy automático no Vercel a cada push no GitHub.

**URLs de produção:**

| Página | URL |
|--------|-----|
| Site principal | https://casamento-fernanda-edson-app.vercel.app |
| Painel Admin | https://casamento-fernanda-edson-app.vercel.app/#/admin |

**Deploy manual:**

```bash
vercel --prod
```

### GitHub

Repositório: https://github.com/tassiadossantos/wedding-fernanda-edson

### Firestore

```bash
firebase deploy --only firestore:rules
```

---

## Regras Firestore

| Coleção | Leitura | Criação | Atualização/Exclusão |
|---------|---------|---------|---------------------|
| `guestbook` | Pública | Pública | Bloqueada |
| `rsvp` | Pública | Pública | Bloqueada |
| `gift_reservations` | Pública | Pública | Bloqueada |

---

## Changelog

### v2.0.0 (25/08/2026)

**Personalização**
- Nomes atualizados para Fernanda & Edson
- Data do casamento: 02 de Outubro de 2026 às 18h
- Firebase migrado para projeto `casamento-fernanda-edson0210`
- Senha admin atualizada para `FernandaEdson0210`

**Lista de Presentes**
- Adicionados 26 itens de presente em 5 categorias
- Funcionalidade de reserva por convidado
- Serviço Firestore para controlar reservas
- Prevenção de duplicatas

**Locais**
- Adicionada seção de Recepção (horário, local, endereço)
- Card de Recepção com ícone PartyPopper

**Código de Vestimenta**
- Paleta de cores atualizada para Lavanda (#C4A8FF)
- 6 tons de lavanda/violeta na paleta sugerida
- Descrições atualizadas para lavanda

**RSVP**
- Prazo dinâmico: 7 dias antes do casamento

**Design**
- Tema global atualizado para paleta lavanda
- Cor principal: `#C4A8FF`
- Borders, botões e ícones em lavanda
- theme-color do HTML atualizado

**Conteúdo**
- Textos da linha do tempo personalizados
- "O Primeiro Encontro": história real no Salão de Assembleias
- "O Primeiro Eu Te Amo": texto romântico personalizado
- "O Pedido": história com Yan e pizza

**Correções**
- `calendar.ts` corrigido para usar nomes e locais do config
- Removidos imports não utilizados
- AudioPlayer removido
- Classe `scrollbar-hide` adicionada no CSS
- Touch targets ajustados para 48px mínimo
- Admin stats grid responsivo para mobile
- Repositório GitHub: https://github.com/tassiadossantos/wedding-fernanda-edson
- Deploy Vercel: https://casamento-fernanda-edson-app.vercel.app

### v1.2.0 (10/08/2026)

- Configurado deploy automático no Vercel
- Criado `vercel.json` com rewrites para SPA

### v1.1.0 (10/08/2026)

- Firebase modo produção com regras de segurança
- Formulário RSVP com labels e placeholders atualizados
- Mural de Recados com carrossel automático
- Correção do fundo azul do autofill
- Configurado Vitest com testes unitários

### v1.0.0

- Versão inicial do projeto

---

## Licença

Este projeto é de uso privado — casamento de Fernanda & Edson, 02 de Outubro de 2026.
