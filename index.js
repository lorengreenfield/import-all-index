import fs from 'fs'
import path from 'path'
import url from 'url'

export default function importAllIndex (dir) {
  return new Promise(async resolve => {
    let imported = []
    let files = fs.readdirSync(dir)

    for (let file of files) {
      let filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        let childImport = await importAllIndex(filePath)
        imported = imported.concat(childImport)
      } else if (file === 'index.mjs' || file === 'index.js') {
        let imp = await import(url.pathToFileURL(filePath).toString())
        imported.push(imp)
      }
    }

    resolve(imported)
  })
}
