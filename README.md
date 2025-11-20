## Working on the portfolio

- Work and create commits in main branch. 
- Test locally dev and build versions.

## Push and Deploy to test in real environment

- Push to origin/main.
- GitHub Actions will deploy to GitHub pages on every push.
- Use dev website to test.

## Create a release version and deploy to production

Checkout the release branch: 
```git checkout prod-release```

Merge squash main branch: 
```git merge --squash main```

Create a release commit:
```git commit -m "Release-XXX"```

