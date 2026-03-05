#!/bin/bash

# Check if the current branch is master
current_branch=$(git symbolic-ref --short HEAD)
if [ "$current_branch" != "master" ]; then
  echo "Not on master branch"
  exit 1
fi

# Check for local changes
if ! git diff-index --quiet HEAD --; then
  echo "There are local changes"
  exit 1
fi

# Fetch the latest changes from the remote
git fetch origin

# Check if the local master branch is up to date with the origin master branch
status_output=$(git status -uno)
if ! [[ $status_output == *"Your branch is up to date with 'origin/master'."* ]]; then
  echo "Branch is not up to date with origin"
  exit 1
fi

# Remove the build folder if it exists
rm -rf build
