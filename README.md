# Wedding App — Naiara & Matheus

Convite digital de casamento em formato PWA (Progressive Web App) com funcionalidade de mural de recados conectado ao Firebase Firestore.

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

---

## Pré-requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- Conta no [Firebase Console](https://console.firebase.google.com/)

---

## Configuração do Firebase (passo a passo)

### 1. Criar projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `casamento-naiara-matheus` (ou o nome que preferir)
4. Desative o Google Analytics para este projeto (não é necessário)
5. Clique em **"Criar projeto"**

### 2. Criar o banco Firestore

1. No menu lateral, clique em **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de produção"**
4. Escolha a região mais próxima (ex: `southamerica-east1` para Brasil)
5. Clique em **"Criar"**

### 3. Configurar regras de segurança

No Firestore, vá em **Regras** e substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Guestbook: leitura liberada para todos, escrita liberada para todos
    match /guestbook/{entryId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }

    // RSVP: leitura liberada para todos, escrita liberada para todos
    match /rsvp/{entryId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

Clique em **"Publicar"**.

> **Nota:** Com essas regras, qualquer pessoa pode ler e criar recados, mas não pode editar nem excluir. Para produção, considere adicionar autenticação.

### 4. Obter as credenciais do projeto

1. No menu lateral, clique em **Engrenagem (⚙️) → Configurações do projeto**
2. Na aba **Geral**, role até a seção **"Seus apps"**
3. Clique no ícone **Web (</>)** para adicionar um app web
4. Nome do app: `wedding-app-web`
5. **Desmarque** a opção "Firebase Hosting" (não vamos usar)
6. Clique em **"Registrar app"**
7. Você verá a configuração no formato:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

8. **Copie todos os valores** — você vai precisar deles no próximo passo

### 5. Configurar o app localmente

1. Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd wedding-app
npm install
```

2. Crie o arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

3. Substitua os valores pelos que copiou no Firebase Console

4. Atualize o arquivo `src/lib/firebase.ts` para ler de variáveis de ambiente:

```ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

5. **Nunca** commite o arquivo `.env.local` — ele já está no `.gitignore`

### 6. Testar a conexão

```bash
npm run dev
```

Acesse `http://localhost:5173`, vá até a seção "Recados" e envie uma mensagem. Se aparecer no mural, o Firestore está funcionando.

### 7. Verificar no Console

1. Volte ao [Firebase Console](https://console.firebase.google.com/)
2. Vá em **Firestore Database**
3. Você deverá ver a coleção `guestbook` com os documentos criados

---

## Estrutura do Projeto

```
wedding-app/
├── public/
│   └── favicon.svg              # Favicon SVG com monograma N&M
├── src/
│   ├── components/
│   │   ├── Admin.tsx            # Painel administrativo (senha + dashboard)
│   │   ├── AudioPlayer.tsx      # Player de música de fundo
│   │   ├── DressCode.tsx        # Paleta de cores + dress code
│   │   ├── Footer.tsx           # Rodapé com monograma
│   │   ├── GiftRegistry.tsx     # Chave Pix + QR Code
│   │   ├── Guestbook.tsx        # Mural de recados (Firebase)
│   │   ├── Hero.tsx             # Hero com contagem regressiva
│   │   ├── Locations.tsx        # Locais do evento + mapas
│   │   ├── Navigation.tsx       # Menu fixo com scroll spy
│   │   ├── RSVP.tsx             # Formulário de confirmação
│   │   └── Timeline.tsx         # Linha do tempo do namoro
│   ├── hooks/
│   │   ├── useAudioPlayer.ts    # Controle de áudio
│   │   └── useCountdown.ts      # Contagem regressiva reativa
│   ├── lib/
│   │   ├── calendar.ts          # Google Calendar + .ics
│   │   ├── config.ts            # Configurações do casamento
│   │   ├── firebase.ts          # Inicialização do Firebase
│   │   ├── guestbook.ts         # CRUD Firestore (recados)
│   │   └── rsvp.ts              # CRUD Firestore (confirmações)
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── App.tsx                  # Componente raiz
│   ├── main.tsx                 # Entry point
│   └── index.css                # Tema Tailwind + variáveis
├── index.html                   # HTML com Google Fonts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
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

---

## Configuração

Edite `src/lib/config.ts` para personalizar:

| Campo | Descrição |
|-------|-----------|
| `couple.partner1 / partner2` | Nomes dos noivos |
| `event.date` | Data e hora do casamento |
| `event.ceremony / reception` | Locais, endereços e horários |
| `registry.pixKey` | Chave Pix para presentes |
| `whatsapp` | Número do WhatsApp da assessoria |
| `heroImage` | URL da imagem de fundo do hero |

---

## Painel Administrativo

Painel secreto para os noivos visualizarem todas as confirmações de presença.

### Acesso

1. Acesse: `https://seu-site.com/#/admin`
2. Digite a senha
3. Dashboard será exibido

### Funcionalidades

- **Resumo:** Total de confirmações, quantos vão, não vão e total de convidados
- **Filtros:** Abas "Todos", "Vão" e "Não vão"
- **Cards:** Nome, badge colorido, acompanhantes, restrições alimentares, mensagem e data

### Segurança

- URL secreta (`#/admin`) — não aparece na navegação
- Protegida por senha (armazenada em `sessionStorage`)

### Alterar a senha

Senha atual: `NaiaraMatheus1610`

Para alterar, edite `src/components/Admin.tsx`:

```ts
const ADMIN_PASSWORD = 'sua_nova_senha';
```

---

## Deploy

### Opção 1: Vercel (recomendado)

1. Instale a CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções no terminal
4. O deploy será feito automaticamente a cada push no `main`

### Opção 2: Netlify

1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Arraste a pasta `dist` (após `npm run build`) para o painel
3. Ou conecte o repositório Git para deploy automático

### Opção 3: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Selecione a pasta "dist" como diretório público
firebase deploy
```

---

## Licença

Este projeto é de uso privado — casamento de Naiara & Matheus, 16 de Outubro de 2026.
