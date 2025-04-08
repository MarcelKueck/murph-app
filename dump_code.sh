#!/bin/bash

# --- Configuration ---
OUTPUT_FILE="codebase_content.md"
# Files/patterns to exclude explicitly (add more patterns if needed)
EXCLUDE_PATTERNS=(
    "package-lock.json"
    "test_gemini_key.sh"
    "public/*" # Exclude everything inside the public directory
    # Add other patterns like "node_modules/*", "*.log", etc. if desired
)
# Files to include explicitly even if not tracked by Git (e.g., local configs)
INCLUDE_EXPLICITLY=(
    ".env.local"
)
# Common binary file extensions to skip content for
SKIP_BINARY_EXTENSIONS=("png" "jpg" "jpeg" "gif" "bmp" "ico" "woff" "woff2" "eot" "otf" "mp3" "mp4" "avi" "mov" "pdf" "doc" "docx" "xls" "xlsx" "ppt" "pptx" "zip" "gz" "tar" "rar" "o" "a" "so" "dll" "exe")

# --- Helper Function: Check if path matches any exclude pattern ---
should_exclude() {
    local file_path="$1"
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        # Use bash pattern matching. Enable extglob for ** if needed.
        # shopt -s extglob # Uncomment if using patterns like **/*.log
        if [[ "$file_path" == $pattern ]]; then
            # shopt -u extglob # Uncomment if enabling extglob
            return 0 # 0 means true (should exclude)
        fi
        # shopt -u extglob # Uncomment if enabling extglob
    done
    return 1 # 1 means false (should not exclude)
}


# --- Helper Function: Guess Markdown language tag from extension ---
get_lang_tag() {
  local filename="$1"
  local extension="${filename##*.}"
  local lower_filename # For case-insensitive extension check

  # Handle no extension or dotfiles like .gitignore
  if [[ "$extension" == "$filename" ]] || [[ "$filename" == .* && "$extension" == "" ]]; then
      # Try common dotfiles first
      case "$(basename "$filename")" in
          .gitignore|.gitattributes|.dockerignore) echo "gitignore" ;;
          Dockerfile) echo "dockerfile" ;;
          .env*) echo "bash" ;; # Treat .env files like shell variables
          *) echo "text" ;; # Default for no extension or unknown dotfiles
      esac
      return
  fi

  # Convert extension to lowercase for case-insensitive matching
  lower_extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

  # Map common extensions to Markdown language tags
  case "$lower_extension" in
    sh|bash)       echo "bash" ;;
    py)            echo "python" ;;
    js|mjs)        echo "javascript" ;;
    jsx)           echo "jsx" ;;
    ts)            echo "typescript" ;;
    tsx)           echo "tsx" ;;
    html|htm)      echo "html" ;;
    css)           echo "css" ;;
    scss|sass)     echo "scss" ;;
    json)          echo "json" ;;
    yaml|yml)      echo "yaml" ;;
    md|markdown)   echo "markdown" ;;
    java)          echo "java" ;;
    kt|kts)        echo "kotlin" ;;
    c)             echo "c" ;;
    cpp|cxx|hpp|h) echo "cpp" ;;
    cs)            echo "csharp" ;;
    go)            echo "go" ;;
    php)           echo "php" ;;
    rb)            echo "ruby" ;;
    rs)            echo "rust" ;;
    sql)           echo "sql" ;;
    swift)         echo "swift" ;;
    xml|svg)       echo "xml" ;;
    toml)          echo "toml" ;;
    prisma)        echo "prisma" ;;
    *)             echo "" ;; # Use empty (generic) if unknown
  esac
}

# --- Helper Function: Check if extension is in the binary skip list ---
is_binary_extension() {
    local filename="$1"
    local extension="${filename##*.}"
    local lower_extension
    # No extension? Not binary by this check.
    if [[ "$extension" == "$filename" ]]; then
        return 1 # False (not binary)
    fi

    lower_extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    for ext in "${SKIP_BINARY_EXTENSIONS[@]}"; do
        if [[ "$lower_extension" == "$ext" ]]; then
            return 0 # True (is binary)
        fi
    done
    return 1 # False (not binary)
}


# --- Script Logic ---

# Check if this is a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: This script should ideally be run inside a Git repository" >&2
    echo "       to correctly use the .gitignore file (unless explicitly including files)." >&2
    is_git_repo=false
else
    is_git_repo=true
fi

echo "Starting codebase dump to Markdown..."
if $is_git_repo; then
    echo " (Respecting .gitignore for tracked files)"
else
    echo " (Not a Git repo, will attempt to list all files - might be slow/include unwanted files)"
    echo " Consider running this inside a Git repository for better filtering."
fi


# Create or clear the output file
echo "# Codebase Content Dump" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
# Convert arrays to strings for echoing
exclude_str="${EXCLUDE_PATTERNS[*]}"
include_str="${INCLUDE_EXPLICITLY[*]}"
binary_str="${SKIP_BINARY_EXTENSIONS[*]}"
echo "Exclusion patterns: ${exclude_str:-None}" >> "$OUTPUT_FILE"
echo "Explicitly included files: ${include_str:-None}" >> "$OUTPUT_FILE"
echo "Binary content extensions skipped: ${binary_str:-None}" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## File Index" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Use an associative array to keep track of files added to prevent duplicates
declare -A included_files_map

file_list=() # Use a regular array to maintain order for processing

# --- File Collection Phase ---

# Pass 1: Collect files from Git (if available) using Process Substitution
if $is_git_repo; then
    echo "Collecting files tracked by Git..."
    # *** THE FIX IS HERE: Using < <(...) instead of | while ... ***
    while IFS= read -r -d $'\0' file_path; do
      # Skip empty paths just in case
      if [[ -z "$file_path" ]]; then
          continue
      fi

      # Skip if it matches an exclude pattern
      if should_exclude "$file_path"; then
          echo "Skipping excluded (Git): $file_path" >&2
          continue
      fi

      # Check if file exists (might be deleted but still in index)
      # And skip the output file itself
      if [[ ! -f "$file_path" || "$file_path" == "$OUTPUT_FILE" ]]; then
          continue
      fi

      # Add to list and map if not already present
      if [[ -z "${included_files_map[$file_path]}" ]]; then
          # Add to index in the output file during collection
          echo "*   \`$file_path\`" >> "$OUTPUT_FILE"
          file_list+=("$file_path")
          included_files_map["$file_path"]=1
      fi
    done < <(git ls-files -z) # *** End of the Process Substitution loop ***
fi

# Pass 2: Add explicitly included files (if they exist and aren't already listed)
echo "Checking for explicitly included files..."
for file_path in "${INCLUDE_EXPLICITLY[@]}"; do
    # Skip if it matches an exclude pattern (explicit include overrides gitignore, but not our excludes)
    if should_exclude "$file_path"; then
        echo "Skipping excluded (Explicit): $file_path" >&2
        continue
    fi

    if [[ -f "$file_path" && -z "${included_files_map[$file_path]}" ]]; then
        echo "Including explicit file: $file_path" >&2
        # Add to index in the output file
        echo "*   \`$file_path\` (Explicitly included)" >> "$OUTPUT_FILE"
        file_list+=("$file_path")
        included_files_map["$file_path"]=1
    elif [[ -f "$file_path" && ! -z "${included_files_map[$file_path]}" ]]; then
         echo "Skipping already included (Explicit): $file_path" >&2
    elif [[ ! -f "$file_path" ]]; then
         echo "Skipping non-existent (Explicit): $file_path" >&2
    fi
done

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE" # Add a separator
echo "" >> "$OUTPUT_FILE"


# --- Content Processing Phase ---
echo "Processing files and appending content..."
processed_count=0
total_files=${#file_list[@]}

if [[ $total_files -eq 0 ]]; then
    echo "Warning: No files found to process. Check exclude patterns or Git tracking." >&2
    echo "[No files were processed]" >> "$OUTPUT_FILE"
else
    # Iterate over the collected list of files
    for file_path in "${file_list[@]}"; do
      ((processed_count++))
      # Check again for empty path just to be absolutely sure
      if [[ -z "$file_path" ]]; then
          echo "Warning: Encountered empty file path in processing loop, skipping." >&2
          continue
      fi

      echo "Processing (${processed_count}/${total_files}): $file_path"

      # Determine the language tag for the Markdown code block
      lang_tag=$(get_lang_tag "$file_path")
      # Extract extension for binary check message
      extension="${file_path##*.}"

      # Append Markdown formatted content to the output file
      {
        # Use a Markdown heading for the file path
        echo "## File: \`$file_path\`"
        echo ""

        # Check if the file has a binary extension
        if is_binary_extension "$file_path"; then
            echo "[Skipping content for binary file type .$extension]"
            echo ""
        # Check if the file is readable before attempting cat
        elif [[ ! -r "$file_path" ]]; then
            echo "[Error: Cannot read file (permission issue?): $file_path]"
            echo ""
        else
            # Start the Markdown fenced code block with the guessed language
            echo "\`\`\`$lang_tag"

            # Print the file content
            # Use LANG=C LC_ALL=C to avoid locale issues
            if LANG=C LC_ALL=C cat "$file_path" 2>/dev/null; then
                 # Ensure a newline exists *before* the closing fence
                 # Check if last char was newline. If not, add one.
                 # Getting the last char efficiently after cat is tricky,
                 # simpler to just ensure one is printed by the echo below.
                 echo "" # Add newline before closing fence
            else
                # Handle read errors during cat
                echo "[Error reading file contents: $file_path]"
                 # Still add newline before closing fence even on error
                 echo ""
            fi

            # End the Markdown fenced code block
            echo "\`\`\`"
            echo "" # Add an extra blank line for readability between files
        fi

      } >> "$OUTPUT_FILE"

    done
fi


echo "" >> "$OUTPUT_FILE" # Add final newline to the output file for cleanliness
echo "Codebase content saved to $OUTPUT_FILE"
echo "Done."