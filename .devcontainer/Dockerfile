FROM ubuntu:24.04

# Install basic development tools first
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  wget \
  jq \
  nano \
  vim \
  git \
  sudo \
  iptables \
  ipset \
  dnsutils \
  iproute2 \
  ca-certificates \
  gnupg \
  libcap2-bin \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js 24 from NodeSource
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_24.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
  && apt-get update \
  && apt-get install -y nodejs \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Rename ubuntu user to node and ensure node home directory exists
RUN usermod -l node -d /home/node -m ubuntu && \
    mkdir -p /home/node && \
    chown -R 1000:1000 /home/node

# Add node user to sudo group for passwordless sudo (needed for firewall setup)
RUN usermod -aG sudo node && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Grant node user specific capabilities for network management
RUN setcap cap_net_admin,cap_net_raw+ep /usr/sbin/xtables-legacy-multi && \
    setcap cap_net_admin,cap_net_raw+ep /usr/sbin/xtables-nft-multi && \
    setcap cap_net_admin+ep /usr/sbin/ipset

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace && chown -R 1000:1000 /workspace
WORKDIR /workspace

# Note: secure-network.sh is available via workspace mount, no copy needed

# Install Claude Code globally
RUN npm install -g @anthropic-ai/claude-code

ENV SHELL=/bin/bash

# Set the default editor and visual
ENV EDITOR vim
ENV VISUAL vim
