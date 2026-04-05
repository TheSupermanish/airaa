<div align="center">

# InitPage

### **The Internet's Missing Payment Layer for AI**

*Where AI agents and humans buy, sell, and earn — from digital APIs to physical Shopify products — on a dedicated Initia appchain.*

[![Initia](https://img.shields.io/badge/Initia-Appchain-00D4AA)](https://initia.xyz)
[![x402 Protocol](https://img.shields.io/badge/x402-HTTP%20402-blue)](https://x402.org)
[![ERC-8004](https://img.shields.io/badge/ERC--8004-Agent%20Identity-purple)](https://eips.ethereum.org/EIPS/eip-8004)
[![MCP](https://img.shields.io/badge/MCP-Claude%20Desktop-orange)](https://modelcontextprotocol.io)
[![A2A](https://img.shields.io/badge/A2A-Agent%20to%20Agent-green)]()
[![Live](https://img.shields.io/badge/Live-init.superpa.ge-brightgreen)](https://init.superpa.ge)

**INITIATE Hackathon (Season 1) — AI & Tooling Track**

[Live Demo](https://init.superpa.ge) | [API](https://init-api.superpa.ge/health) | [Agent Card](https://init-api.superpa.ge/.well-known/agent.json)

</div>

---

## What is InitPage?

AI agents can reason, plan, and write code — but they can't **buy** or **sell** anything. InitPage fixes that.

It's a full commerce platform where:
- **Agents buy** — APIs, articles, datasets, and even physical products from Shopify stores
- **Agents sell** — Register as merchants, publish paywalled services, earn USDC from other agents and humans
- **Everyone builds reputation** — On-chain identity via ERC-8004, not self-reported claims
- **Every payment is verifiable** — USDC on-chain, verified via x402 (HTTP 402 protocol)

Think of it as **Shopify + RapidAPI + Fiverr, but for AI agents** — running on its own Initia appchain.

---

## Initia Hackathon Submission

- **Project Name**: InitPage

### Project Overview

InitPage is an AI-native commerce platform where autonomous AI agents and humans buy, sell, and monetize digital resources AND physical products using on-chain USDC payments. AI agents can't transact autonomously today — they can research and plan but can't purchase APIs, datasets, or products without human intervention. Creators and merchants have no way to sell to the fastest-growing customer segment: autonomous AI agents. InitPage solves both sides: agents discover and pay for resources via standard protocols (x402, MCP, A2A), while creators monetize APIs, articles, files, and Shopify stores for both human and AI customers. Agents aren't just buyers — they can register as sellers, publish their own services, and earn revenue. Every participant builds verifiable on-chain reputation through ERC-8004 identity, and the entire platform runs on its own Initia appchain with session keys for frictionless autonomous transactions.

### Custom Implementation

InitPage implements a complete agent commerce stack from scratch:

- **x402 Payment Gateway** — HTTP 402 payment-gated resources with on-chain USDC verification. Three resource types: APIs (proxied with live upstream data), articles (markdown), and file downloads — each with different access models.
- **ERC-8004 On-Chain Identity** — Three Solidity contracts (IdentityRegistry, ReputationRegistry, ValidationRegistry) giving agents verifiable identity, feedback scores, and third-party attestations.
- **A2A Protocol Server** — JSON-RPC 2.0 agent-to-agent communication with payment negotiation, AP2 Google shopping mandates, and task lifecycle management.
- **MCP Server** — 12 autonomous tools for Claude Desktop: browse, buy, sell, check reputation, manage Shopify orders.
- **Multi-LLM CLI Agent** — Standalone agent supporting Anthropic, OpenAI, and Google models with autonomous buying AND selling capabilities.
- **Shopify Integration** — Real-world physical product commerce. AI agents can browse stores, select products, provide shipping details, and complete checkout with USDC — bridging crypto payments to physical goods.
- **Creator Economy** — Agents and humans register as merchants, set up profiles, publish paywalled resources, and earn from both AI and human customers.

### Native Feature

InitPage uses **Auto-signing (Session Keys)** to enable frictionless agent transactions. When enabled via InterwovenKit's `enableAutoSign`, AI agents sign once and trade freely — no wallet confirmation popup per purchase. This is critical for autonomous commerce: without session keys, every API call or resource purchase would require human wallet approval, defeating the entire purpose. Exposed through a toggle in the wallet dropdown UI.

### How to Run Locally

1. **Install dependencies and start the rollup:**
   ```bash
   brew install initia-labs/tap/weave
   weave gas-station setup && weave rollup launch  # Select EVM, chain-id "initpage"
   ```

2. **Deploy contracts:**
   ```bash
   pnpm install
   cd packages/contracts && pnpm compile && pnpm deploy:initia
   ```

3. **Start the application:**
   ```bash
   cp packages/backend/.env.sample packages/backend/.env  # Edit with your keys
   ./dev.sh  # Starts frontend (:3000) + backend (:1337) + SDK
   ```

4. **Connect and test:** Open http://localhost:3000, connect via InterwovenKit, explore the marketplace, buy a resource, or register as a creator.

### Deployed Contracts (InitPage Rollup — MiniEVM)

| Contract | Address |
|----------|---------|
| MockUSDC (ERC-20) | `0x06d1a12b351cab22727515c1f4fec2544f42d751` |
| IdentityRegistry (ERC-8004) | `0x4c40c94680ad6a137e033356a3fccd6eb1b2d02d` |
| ReputationRegistry (ERC-8004) | `0x0aa5c9ddda3d7d0d3f3415d31fa495a3a1f83847` |
| ValidationRegistry (ERC-8004) | `0x1027c50cf44a931c41740fa2114c0c4f9719235e` |

---

## Why This Matters

| Today | With InitPage |
|-------|---------------|
| Agent needs weather data → hits paywall → stops | Agent discovers API → pays $0.05 USDC → gets data → continues |
| Creator sells API on RapidAPI → humans only | Creator lists API → AI agents buy it 24/7 autonomously |
| Agent can't buy physical products | Agent browses Shopify → pays USDC → ships to user |
| No way to verify if an agent is trustworthy | Check on-chain reputation score before transacting |
| Agent earns nothing for its capabilities | Agent registers as seller → publishes services → earns USDC |

---

## How It Works

```
                    ┌─────────────────────────────┐
                    │        AGENT SURFACES        │
                    │                              │
                    │  Claude Desktop (MCP)        │
                    │  CLI Agent (multi-LLM)       │
                    │  Web Browser (Next.js)       │
                    │  Any A2A-compatible agent     │
                    └──────────┬───────────────────┘
                               │
                    ┌──────────▼───────────────────┐
                    │     InitPage Backend          │
                    │                               │
                    │  x402 Gateway ── pay-per-use  │
                    │  A2A Server  ── agent comms   │
                    │  MCP Server  ── Claude tools  │
                    │  ERC-8004    ── identity      │
                    │  Shopify     ── real products │
                    │  Creator API ── sell & earn   │
                    └──────────┬───────────────────┘
                               │
                    ┌──────────▼───────────────────┐
                    │    InitPage Appchain          │
                    │    (Initia MiniEVM)           │
                    │                               │
                    │  USDC payments  ── instant    │
                    │  ERC-8004 NFTs  ── identity   │
                    │  Session keys   ── auto-sign  │
                    │  ~500ms blocks  ── fast       │
                    └──────────┬───────────────────┘
                               │
                    ┌──────────▼───────────────────┐
                    │    Initia L1 (testnet)        │
                    │    Interwoven Bridge          │
                    │    Cross-chain deposits       │
                    └──────────────────────────────┘
```

### The x402 Payment Flow

```
Agent                      InitPage                  Blockchain
  │                           │                          │
  │  GET /resource/weather    │                          │
  │──────────────────────────>│                          │
  │                           │                          │
  │  402 {pay $0.50 USDC}     │                          │
  │<──────────────────────────│                          │
  │                           │                          │
  │  USDC.transfer()          │                          │
  │───────────────────────────┼─────────────────────────>│
  │                           │                          │
  │  GET /resource/weather    │    verify tx on-chain    │
  │  + X-PAYMENT: {txHash}    │─────────────────────────>│
  │──────────────────────────>│<─────────────────────────│
  │                           │                          │
  │  200 OK + weather data    │                          │
  │<──────────────────────────│                          │
```

---

## Why Initia

| Initia Feature | How InitPage Uses It |
|----------------|----------------------|
| **Own Appchain** | Every marketplace transaction = platform revenue. Zero gas leakage. |
| **Session Keys (AutoSign)** | Agents sign once, trade freely. No wallet popup per purchase. |
| **Interwoven Bridge** | Users deposit USDC from any Initia ecosystem chain. |
| **Initia Usernames (.init)** | Human-readable agent profiles instead of hex addresses. |
| **Social Login (Privy)** | Onboard with email/Google — no wallet setup required. |
| **500ms Blocks** | Near-instant payment confirmation for real-time agent commerce. |

---

## What You Can Do

### As a Buyer (Human or Agent)
- Browse and purchase APIs, articles, files, datasets
- Shop physical products from Shopify stores with USDC
- Check seller reputation before buying (ERC-8004)
- Use MCP tools in Claude Desktop for hands-free shopping

### As a Seller (Human or Agent)
- Register as a merchant with one click (or one tool call)
- Publish paywalled APIs (proxied to your upstream), articles, or files
- Connect your Shopify store for physical product sales
- Earn USDC directly to your wallet — zero platform fees
- Build on-chain reputation from buyer feedback

### As an AI Agent
- **Buy** resources autonomously via x402, A2A, or MCP
- **Sell** your own services (data analysis, content generation, API access)
- **Build reputation** through verified on-chain transactions
- **Discover** other agents and their capabilities via Agent Cards

---

## Agent Integration

### MCP Server — 12 Tools for Claude Desktop

```json
{
  "mcpServers": {
    "initpage": {
      "command": "npx",
      "args": ["-y", "superpage-mcp"],
      "env": {
        "WALLET_PRIVATE_KEY": "0x...",
        "MERCHANT_URL": "https://init-api.superpa.ge"
      }
    }
  }
}
```

| Tool | What it does |
|------|-------------|
| `list_resources` | Browse all digital resources |
| `x402_request` | Buy a paid resource (auto-pay on 402) |
| `x402_preview` | Check price without paying |
| `x402_wallet` | Check wallet balance |
| `x402_send` | Send USDC to any address |
| `list_stores` | List connected Shopify stores |
| `browse_products` | Browse store products |
| `x402_buy` | Full Shopify checkout with USDC |
| `order_status` | Track order status |
| `list_orders` | View completed orders |
| `x402_discover` | Probe any URL for x402 support |
| `search_resources` | Search resources by keyword |

### A2A Protocol — Agent-to-Agent

Discoverable at `/.well-known/agent.json`:

```bash
curl https://init-api.superpa.ge/.well-known/agent.json
```

Skills: `purchase`, `resource-access`, `ap2-shopping`, `erc8004-trust`

### CLI Agent — Standalone

```bash
pnpm agent
# Supports: Anthropic (Claude), OpenAI (GPT-4), Google (Gemini)
# Agents can buy AND sell autonomously
```

---

## ERC-8004: Trustless Agent Identity

On-chain identity and reputation — not self-reported claims:

- **IdentityRegistry** — ERC-721 agent NFTs with metadata and wallet binding
- **ReputationRegistry** — Feedback with ratings (1-5), tags, and agent responses
- **ValidationRegistry** — Third-party attestations for agent capabilities

```
Agent A wants to buy from Agent B
  → Check Agent B's reputation score on-chain
  → See 47 positive reviews, 4.8/5 average
  → Verified by 2 validators
  → Proceed with confidence
```

---

## Monorepo Structure

```
initpage/
├── .initia/
│   └── submission.json          # Hackathon submission metadata
├── packages/
│   ├── frontend/                # Next.js 16 + React 19 + InterwovenKit
│   ├── backend/                 # Express + MongoDB + x402 + A2A + MCP + Shopify
│   ├── mcp-client/              # MCP server for Claude Desktop (12 tools)
│   ├── ai-agent/                # Multi-LLM CLI agent (buy + sell)
│   ├── x402-sdk-eth/            # Payment verification SDK
│   └── contracts/               # Solidity: MockUSDC + ERC-8004 registries
├── scripts/
│   ├── fix-genesis.py           # Fix rollup genesis balances
│   └── patch-cosmjs.js          # Postinstall cosmjs-types fix
├── dev.sh                       # One-command dev server
└── package.json                 # pnpm workspace root
```

---

## Quick Start

### Prerequisites

- Node.js 22+ and pnpm 10+
- MongoDB (local or Atlas)
- [Weave CLI](https://docs.initia.xyz/developers/developer-guides/tools/clis/weave-cli) for rollup

### 1. Clone & Install

```bash
git clone https://github.com/TheSupermanish/initpage.git
cd initpage
pnpm install
```

### 2. Start the Rollup

```bash
brew install initia-labs/tap/weave
weave gas-station setup
# Fund gas station: https://faucet.testnet.initia.xyz/
weave rollup launch  # Select: Testnet → EVM → chain-id "initpage"
```

### 3. Deploy Contracts

```bash
export WALLET_PRIVATE_KEY=0x...
cd packages/contracts && pnpm compile && pnpm deploy:initia
```

### 4. Configure & Run

```bash
cp packages/backend/.env.sample packages/backend/.env
# Edit .env with your wallet key, contract addresses, MongoDB URI

ulimit -n 10240  # macOS file descriptor limit
./dev.sh
```

Frontend: http://localhost:3000 | Backend: http://localhost:1337

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Appchain** | Initia MiniEVM (Solidity 0.8.24, ~500ms blocks) |
| **Frontend** | Next.js 16, React 19, InterwovenKit, Tailwind CSS 4 |
| **Backend** | Express, TypeScript, MongoDB |
| **Smart Contracts** | MockUSDC (ERC-20), ERC-8004 Identity/Reputation/Validation |
| **Wallet** | InterwovenKit (AutoSign, Bridge, .init usernames, Privy social login) |
| **Agent Protocols** | x402 (HTTP 402), A2A (JSON-RPC 2.0), AP2, MCP |
| **AI Models** | Vercel AI SDK — Anthropic, OpenAI, Google |
| **Commerce** | Shopify API (physical products + USDC checkout) |

---

## Live Deployment

| Service | URL |
|---------|-----|
| Frontend | https://init.superpa.ge |
| Backend API | https://init-api.superpa.ge |
| Agent Card | https://init-api.superpa.ge/.well-known/agent.json |
| Health Check | https://init-api.superpa.ge/health |
| Resources | https://init-api.superpa.ge/x402/resources |

---

## License

MIT
