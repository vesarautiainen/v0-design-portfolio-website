#!/usr/bin/env bash
set -e

PROD_REMOTE="production"
PROD_BRANCH="main"
SNAPSHOT_BRANCH="prod-snapshot"

###
# CHECKS
###

# Check inside git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: This script must be run from inside a Git repository."
    exit 1
fi

# Check remote exists
if ! git remote get-url "$PROD_REMOTE" > /dev/null 2>&1; then
    echo "❌ Error: Remote '$PROD_REMOTE' does not exist."
    echo "Add it using: git remote add production <URL>"
    exit 1
fi

# Ensure working tree is clean
if ! git diff-index --quiet HEAD --; then
    echo "❌ Error: Working directory is dirty. Commit or stash your changes first."
    exit 1
fi

# Ensure the remote branch exists
if ! git ls-remote --heads "$PROD_REMOTE" "$PROD_BRANCH" | grep -q .; then
    echo "❌ Error: Branch '$PROD_BRANCH' does not exist on remote '$PROD_REMOTE'."
    exit 1
fi

echo "✔ All checks passed"
echo

###
# CREATE SNAPSHOT COMMIT
###

git fetch "$PROD_REMOTE"

echo "📦 Creating release snapshot on top of $PROD_REMOTE/$PROD_BRANCH..."
git checkout -b "$SNAPSHOT_BRANCH" "$PROD_REMOTE/$PROD_BRANCH"

# Replace contents with the current main branch
git rm -r . --ignore-unmatch
git checkout main -- .

git add .
git commit -m "Release to production: $(date +'%Y-%m-%d %H:%M:%S')"

###
# PUSH TO PRODUCTION (without force)
###

echo "🚀 Pushing release to $PROD_REMOTE/$PROD_BRANCH..."
git push "$PROD_REMOTE" "$SNAPSHOT_BRANCH:$PROD_BRANCH"

###
# CLEAN UP
###

git checkout main
git branch -D "$SNAPSHOT_BRANCH"

echo
echo "🎉 Deployment complete!"
