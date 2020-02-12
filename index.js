const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdirP = promisify(fs.readdir)
const statP = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)

module.exports = function netlifyPlugin(config) {
  return {
    name: 'netlify-plugin-debug-cache',
    onEnd: async ({ constants, pluginConfig }) => {
      const { BUILD_DIR, CACHE_DIR } = constants
      const cacheManifestFileName = pluginConfig.outputFile || 'cache-output.json'
      const cacheManifestPath = path.join(BUILD_DIR, cacheManifestFileName)
      console.log('Saving cache file manifest for debugging...')
      let files = []
      try {
        files = await getCacheInfo({
          cacheDirectory: CACHE_DIR,
          outputPath: cacheManifestPath,
        })
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

async function readDir(dir, allFiles = []) {
  const files = (await readdirP(dir)).map(f => path.join(dir, f))
  allFiles.push(...files)
  await Promise.all(
    files.map(
      async f => (await statP(f)).isDirectory() && readDir(f, allFiles)
    )
  )
  return allFiles
}

async function getCacheInfo(opts = {}) {
  if (!opts.cacheDirectory) {
    throw new Error('Must specify cacheDirectory to read')
  }
  let files
  try {
    // Recursively read all files in the cache directory
    files = await readDir(opts.cacheDirectory)
    // Write cache map into a file to download after build succeeds
    if (opts.outputPath) {
      await writeFile(opts.outputPath, JSON.stringify(files, null, 2))
    }
  } catch (e) {
    console.log('err', e)
  }
  return files
}
