const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

module.exports = {
    onEnd: async ({ constants, inputs, utils }) => {
      const { PUBLISH_DIR } = constants
      const cacheManifestFileName = inputs.outputFile
      const cacheManifestPath = path.join(PUBLISH_DIR, cacheManifestFileName)
      console.log('Saving cache file manifest for debugging...')
      const files = await utils.cache.list()
      await writeFile(cacheManifestPath, JSON.stringify(files, null, 2))
      console.log(`Cache file count: ${files.length}`)
      console.log(`Cache manifest saved to ${cacheManifestPath}`)
      console.log(`Please download the build files to inspect ${cacheManifestFileName}.`)
      console.log('Instructions => http://bit.ly/netlify-dl-cache')
    }
}

