source "https://rubygems.org"

# Use the latest version of Jekyll
gem "jekyll", "~> 4.3.3"
gem 'ostruct'
gem 'logger'
gem 'csv'
gem 'base64'

# Plugins
group :jekyll_plugins do
  gem 'jekyll-assets' 
end

# Windows and JRuby dependencies (if needed)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows (if needed)
gem "wdm", "~> 0.1.1", platforms: [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` for JRuby builds (if using JRuby)
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]