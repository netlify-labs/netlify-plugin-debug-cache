# Netlify Plugin Debug Cache

Debug & verify the contents of your Netlify build cache

## Install

You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-debug-cache/install) or from the [Plugins directory](https://app.netlify.com/plugins).

To use file-based installation, add the following lines to your `netlify.toml` file, after any other plugins you may have added:

```toml
[[plugins]]
package = "netlify-plugin-debug-cache"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

To complete file-based installation, from your project's base directory, use npm, yarn, or any other Node.js package manager to add this plugin to devDependencies in `package.json`.

```
npm install -D netlify-plugin-debug-cache
```

## Use

After the build is complete, download the built assets and inspect the cache manifest file.

In Netlify, you can download the build with this icon

![image](https://user-images.githubusercontent.com/532272/70269557-7faf2600-1757-11ea-8a3b-4ce38ce6d6d2.png)

Then inspect the cache output

![image](https://user-images.githubusercontent.com/532272/74368535-b40f1600-4d88-11ea-98ee-8d5e2a06168c.png)
