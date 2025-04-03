#!/bin/bash

# --- Configuration ---
OUTPUT_FILE="codebase_content.txt"
SEPARATOR="=================================================="

# --- Script Logic ---

# Check if this is a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: This script must be run inside a Git repository (like murph-app)"
    echo "       to correctly use the .gitignore file."
    exit 1
fi

echo "Starting codebase dump (respecting .gitignore)..."

# Create or clear the output file
> "$OUTPUT_FILE"

# Use 'git ls-files' which lists tracked files, automatically respecting .gitignore
# Use -z and read -d $'\0' for safe handling of filenames with spaces/special chars
git ls-files -z | while IFS= read -r -d $'\0' file_path; do
  # Check if the file actually exists (might be deleted but still in index briefly)
  # and ensure we don't include the output file itself (if it got added accidentally)
  if [[ ! -f "$file_path" || "$file_path" == "$OUTPUT_FILE" ]]; then
      continue
  fi

  echo "Processing: $file_path"

  # Append separator, file path, and content to the output file
  # Using a group command {} >> speeds up appending slightly
  {
    echo "$SEPARATOR"
    # git ls-files outputs paths relative to the repository root
    echo "File: $file_path"
    echo "" # Add a blank line before content

    # Print the file content, handling potential read errors
    cat "$file_path" 2>/dev/null || echo "[Error reading file: $file_path]"

    # Add a newline after the content, before the separator
    echo ""

    # Print the separator after the file content
    echo "$SEPARATOR"
    echo "" # Add an extra blank line for readability between files
  } >> "$OUTPUT_FILE"

done

echo "Codebase content saved to $OUTPUT_FILE"
echo "Done."
