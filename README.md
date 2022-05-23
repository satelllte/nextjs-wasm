# NextJS WASM

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/satelllte/nextjs-wasm)

## Prerequisites

- [NodeJS](https://nodejs.org/) | recommended version: 16
- [Rust & Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) | recommended version: 1.61
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) | recommended version: 0.10.2

## Getting Started

Install dependencies:

```bash
npm install
```

Compile WebAssembly:

```bash
npm run build:wasm
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build:wasm # if wasn't built yet
npm run build
```
