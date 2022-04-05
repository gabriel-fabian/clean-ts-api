#!bin/sh

npx husky set .husky/commit-msg ".git/hooks/commit-msg \$1"
npx husky set .husky/pre-push "npx lint-staged"
