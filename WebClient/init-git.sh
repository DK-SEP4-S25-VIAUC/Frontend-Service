#!/bin/bash
set -e

echo "Checking SSH access to GitHub..."

# Make sure GitHub's host key is known
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null

# Fix permissions on common private key types
chmod 600 ~/.ssh/id_rsa 2>/dev/null || true
chmod 600 ~/.ssh/id_ed25519 2>/dev/null || true

# Test SSH access
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo "SSH access to GitHub verified!"
else
    echo "SSH access to GitHub failed."
    echo "Please ensure your SSH key is mounted and added to your GitHub account."
    exit 1
fi

# Fix Git remote if needed
remote_url=$(git remote get-url origin)
if [[ "$remote_url" == https://* ]]; then
    echo "Replacing HTTPS Git remote with SSH..."
    ssh_url=${remote_url/https:\/\/github.com\//git@github.com:}
    git remote set-url origin "$ssh_url"
    echo "Remote updated to $ssh_url"
else
    echo "Git remote already uses SSH."
fi
