# Netlify Plugin Debug Cache

Debug & verify the contents of your Netlify build cache

## Install

```bash
npm install netlify-plugin-debug-cache
```

## Usage

In your Netlify config file, add the plugin

```yml
# Build plugins
plugins:
  # Make sure to add as the last plugin
  - package: netlify-plugin-debug-cache
```

After the build is complete, download the built assets and inspect the cache manifest file.

In Netlify, you can download the build with this icon

![image](https://user-images.githubusercontent.com/532272/70269557-7faf2600-1757-11ea-8a3b-4ce38ce6d6d2.png)
