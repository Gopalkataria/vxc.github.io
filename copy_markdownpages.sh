#!/usr/bin/bash
#
# as the name suggests, copy markdown folders to pages.
#!/bin/bash

SOURCE_DIR="markdown"
DEST_DIR="src/pages"




find "$SOURCE_DIR" -type f | while read -r src_file; do
  rel_path="${src_file#$SOURCE_DIR/}"
  dest_file="$DEST_DIR/$rel_path"
  dest_dir=$(dirname "$dest_file")
  mkdir -p "$dest_dir"

  if [ -f "$dest_file" ]; then
    if ! cmp -s "$src_file" "$dest_file"; then
      echo "File '$rel_path' exists and differs."
      # Explicit prompt
      read -p "Update '$rel_path' with contents from file in markdown? [y/N]: " confirm < /dev/tty
      if [[ "$confirm" =~ ^[Yy]$ ]]; then
        cp "$src_file" "$dest_file"
        echo "Updated: $rel_path"
      else
        echo "Skipped: $rel_path"
      fi
    else
      echo "Unchanged: $rel_path"
    fi
  else
    cp "$src_file" "$dest_file"
    echo "Copied new file: $rel_path"
  fi
done
