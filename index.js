const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

module.exports = function netlifyPlugin(config) {
  return {
    name: 'netlify-plugin-debug-cache',
    onEnd: async ({ constants, pluginConfig, utils }) => {
      const { BUILD_DIR } = constants
      const cacheManifestFileName = pluginConfig.outputFile || 'cache-output.json'
      const cacheManifestPath = path.join(BUILD_DIR, cacheManifestFileName)
      console.log('Saving cache file manifest for debugging...')
      let files = []
      try {
        files = await utils.cache.list()
        if (cacheManifestPath) {
          await writeFile(cacheManifestPath, JSON.stringify(files, null, 2))
        }
      } catch (err) {
        console.log(`netlify-plugin-debug-cache error`)
        console.log(err)
      }
      console.log(`Cache file count: ${files.length}`)
      console.log(`Cache manifest saved to ${cacheManifestPath}`)
      console.log(`Please download the build files to inspect ${cacheManifestFileName}.`)
      console.log('Instructions => http://bit.ly/netlify-dl-cache')
    }
  }
}

