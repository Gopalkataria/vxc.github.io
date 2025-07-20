# Markdown-to-Pages Project

### Live Demo (after running `make demo`)
http://localhost:8080


- Edit markdown files in the `markdown/` folder, run make demo again to see changes. output is in dist directory
---

## Project Structure

- All content should be edited in the `markdown/` folder.
- When you run the `build` or `dev` targets, files from `markdown/` are copied to `src/pages/`.
- `src/pages/` is used as the source for development and build.

---

## Makefile Targets


### make demo
Serves the `dist/` folder (build output) on localhost:8080 using:

``` bash
cd dist && python3 -m http.server 8080
```

Open http://localhost:8080 in your browser to view the static site.

### make dev
Installs dependencies using Bun and starts the development server using:


``` bash
bun run dev
```

This will launch the development server. Ensure any changes in `markdown/` are manually copied over if needed.

### make build
Installs dependencies and builds the production site using:


``` bash
make build
```

The built output is placed in the `dist/` directory.


### make clean

``` bash
make clean
```
You can add a `clean` target to remove built files or reset `src/pages`.

---

## Notes

- Bun is automatically installed (if not already) during `make` or `make dev`.
