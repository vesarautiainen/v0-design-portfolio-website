#!/usr/bin/env bash
set -e

###
# CONFIGURATION
###

# The name of the remote that points to the production repo
PROD_REMOTE="production"

# The branch on the production repo you want to push to
PROD_BRANCH="main"

# Temporary branch name that holds the one-commit snapshot
SNAPSHOT_BRANCH="prod-snapshot"

###
# CHECKS
###

# Verify you're inside a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: This script must be run from inside a Git repository."
    exit 1
fi

# Verify the production remote exists
if ! git remote get-url "$PROD_REMOTE" > /dev/null 2>&1; then
    echo "❌ Error: Remote '$PROD_REMOTE' does not exist."
    echo "Add it using: git remote add production <URL>"
    exit 1
fi

echo "✔️ Production remote found: $PROD_REMOTE"
echo

###
# CREATE CLEAN SNAPSHOT USING SUBTREE SPLIT
###

echo "📦 Creating clean snapshot on branch $SNAPSHOT_BRANCH ..."
git checkout -b "$SNAPSHOT_BRANCH"
git reset --soft $(git rev-list --max-parents=0 HEAD)
git commit -m "Release to production: $(date +'%Y-%m-%d %H:%M:%S')"

###
# PUSH TO PRODUCTION
###

echo "🚀 Pushing clean snapshot to $PROD_REMOTE/$PROD_BRANCH ..."
git push "$PROD_REMOTE" "$SNAPSHOT_BRANCH:$PROD_BRANCH" --force

###
# CLEAN UP
###
git checkout main
echo "🧹 Cleaning up temporary branch..."
git branch -D "$SNAPSHOT_BRANCH"

echo
echo "🎉 Deployment complete! Production is now up to date with a single clean commit."