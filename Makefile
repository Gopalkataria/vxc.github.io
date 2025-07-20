# Makefile for managing bun installation, running dev server, and building the project

# Variables
BUNVERSION = bun-v1.2.4
BUN_INSTALL_URL = https://bun.sh/install
PKG_INSTALL_CMD = bun install
DEV_SERVER_CMD = bun run dev
BUILD_CMD = bun run build
CP_MD_CMD = bash copy_markdownpages.sh
PAGES = src/pages

# testing port
PORT = 8080

# Targets
.PHONY: all install-bun dev build

all: install-bun dev

install-bun:
	if ! command -v bun; then \
        curl -fsSL $(BUN_INSTALL_URL) | bash -s $(BUNVERSION); \
    else \
        echo "bun is already installed"; \
    fi

demo:
	$(CP_MD_CMD)
	$(PKG_INSTALL_CMD)
	$(BUILD_CMD)
	cd dist && 	python3 -m http.server $(PORT)

dev:
	$(CP_MD_CMD)
	$(PKG_INSTALL_CMD)
	$(DEV_SERVER_CMD)

build:
	$(CP_MD_CMD)
	$(PKG_INSTALL_CMD)
	$(BUILD_CMD)


clean:
	rm -rf node_modules
	rm -rf .astro
	rm -rf dist
	rm -rf $(PAGES)/biography
	rm -rf $(PAGES)/blog
	rm -rf $(PAGES)/research
	rm -rf $(PAGES)/teaching
	rm -rf $(PAGES)/projects
