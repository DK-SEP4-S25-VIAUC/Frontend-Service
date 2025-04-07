#!/bin/bash

set -e

echo "🔐 Checking SSH access to GitHub..."

# Check if we can connect to GitHub
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo "✅ SSH access to GitHub verified!"
else
    echo "❌ SSH access to GitHub failed."
    echo "Please ensure your SSH key is mounted and added to your GitHub account."
    exit 1
fi

# Get current Git remote
remote_url=$(git remote get-url origin)

# Check if it's using HTTPS
if [[ "$remote_url" == https://* ]]; then
    echo "🔄 Replacing HTTPS Git remote with SSH..."
    ssh_url=${remote_url/https:\/\/github.com\//git@github.com:}
    git remote set-url origin "$ssh_url"
    echo "✅ Remote updated to $ssh_url"
else
    echo "✅ Git remote already uses SSH."
fi
