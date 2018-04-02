# import-all-index
Uses dynamic import() to recursively loop through a directory tree, import all index.mjs files and return an array of references to the imported modules

As of April 2018 (Version 1.0.0), this module requires the esm package to work so that dynamic imports are available. Expected to be available natively in Node 10.

### Usage:

```js
import path from 'path'
import importAllIndex from 'import-all-index'

export default async server => {
  let absolutePath = import.meta.url.replace('file://', '')
  let apiRoutes = await importAllIndex(path.resolve(absolutePath, '../folder_to_import'))

  apiRoutes.forEach(importedModule => {
    if (importedModule.default && typeof importedModule.default === 'function') {
      importedModule.default(server) // runs all imported defaults that are functions injecting the server object provided to the parent function
    }
  })
}

```