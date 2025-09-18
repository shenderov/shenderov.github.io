# shenderov.me – Personal Portfolio

Welcome to my personal portfolio website, built with [Jekyll](https://jekyllrb.com/) and hosted via [GitHub Pages](https://pages.github.com/).  
This site showcases my projects, skills, and experiences.

## 🌐 Live Site

[https://shenderov.me](https://shenderov.me)

## 📁 Project Structure

- `_config.yml` — Main configuration file.
- `_data/` — YAML files for site data.
- `_includes/` — Reusable components (header, footer, etc.).
- `_layouts/` — Templates for pages and posts.
- `_sass/` — Sass partials for styling.
- `assets/` — Images, CSS, JS, and other static assets.
- `index.markdown` — Homepage content.
- Additional pages: `privacy-policy.markdown`, `terms-of-use.markdown`, etc.

## 🚀 Getting Started

### Prerequisites

- [Ruby](https://www.ruby-lang.org/en/downloads/)
- [Bundler](https://bundler.io/)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/shenderov/shenderov.github.io.git
    cd shenderov.github.io
    ```

2. **Install dependencies:**
    ```bash
    bundle install
    ```

3. **Serve the site locally:**
    ```bash
    bundle exec jekyll serve
    ```
    Visit [http://localhost:4000](http://localhost:4000) in your browser.

## 🔧 Configuration

Edit `_config.yml` to update site settings (title, description, theme, etc.).

Example:
```yaml
title: Shenderov Portfolio
description: Showcasing my projects and skills.
```

## ⚙️ Additional Features & Files

- **Gemfile**  
  Specifies Ruby gem dependencies for the project, including `jekyll`, `jekyll-assets`, and others.  
  Run `bundle install` to install all required gems.

- **sitemap.xml**  
  This helps search engines crawl and index the site more efficiently.

- **robots.txt**  
  Instructs search engine bots on how to crawl the site.  
  The default configuration allows all user agents. You can edit `robots.txt` to change crawling rules.

- **README.md**  
  This file! Contains setup and usage documentation for developers and users.

## 📦 Deployment

- The site is automatically deployed via GitHub Pages.
- In your repository settings, make sure GitHub Pages is enabled for the `main` branch.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

- Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to propose changes, report issues, or submit pull requests.

## 📝 License

This project’s source code is licensed under the [MIT License](LICENSE).  

All original content on this site — including photos, biography, project descriptions, blog posts, and other written materials — is copyright © Konstantin Shenderov.  
Such content is not covered by the MIT License and may not be copied, reused, or redistributed without explicit permission from the author.  

For details, see the [NOTICE](NOTICE.md) file.
