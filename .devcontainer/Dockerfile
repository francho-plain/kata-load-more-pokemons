FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Keep pnpm available through Corepack and pre-create its store directory.
RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && mkdir -p /home/node/.local/share/pnpm/store \
  && chown -R node:node /home/node/.local/share/pnpm

ENV PNPM_HOME=/home/node/.local/share/pnpm
ENV PATH=${PNPM_HOME}:${PATH}