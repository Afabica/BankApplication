#!/bin/bash

# GitHub Repository information
owner="Thrumbo33"  # Replace with your GitHub username or organization name
repo="BankApplication"       # Replace with the repository name

# Get the date threshold (10 days ago) in ISO 8601 format
date_threshold=$(date --date="5 month ago" --utc +"%Y-%m-%dT%H:%M:%SZ")

echo "Date threshold: $date_threshold"

# Fetch the list of workflow runs with creation dates
workflow_runs=$(gh run list --repo "$owner/$repo" --json databaseId,createdAt --limit 100)

# Print out all runs to check what's being fetched
echo "Fetched workflow runs: $workflow_runs"

# Find the workflows older than 10 days and get their databaseId
old_workflows=$(echo "$workflow_runs" | jq -r --arg threshold "$date_threshold" \
  '.[] | select(.createdAt < $threshold) | .databaseId')

# Print the old workflows to check what is being selected
echo "Workflows older than 5 days: $old_workflows"

# Loop through each old workflow and delete it
for workflow_id in $old_workflows
do
    echo "Deleting workflow with ID: $workflow_id"
    gh api --method DELETE /repos/$owner/$repo/actions/runs/$workflow_id
    echo "Workflow $workflow_id deleted."
done

