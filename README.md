# Next.js with WebAssembly

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

[Next.js](https://nextjs.org/)-based web application template with [WebAssembly](https://webassembly.org/) module written in [Rust](https://www.rust-lang.org/) programming language.

## Try in [Gitpod](https://www.gitpod.io/)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/satelllte/nextjs-wasm)

## Try in [GitHub Codespaces](https://github.com/features/codespaces)

[![Open in Remote - Containers](https://img.shields.io/static/v1?label=Remote%20-%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/satelllte/nextjs-wasm)

## Prerequisites

- [NodeJS](https://nodejs.org/) | recommended version: `>= 16`
- [Rust & Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) | recommended version: `>= 1.61`

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
