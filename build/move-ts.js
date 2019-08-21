/**
 * Created by xujian1 on 2019-08-21.
 */

const fsExtra = require('fs-extra')
const path = require('path')
const glob = require('glob')
const del = require('del')

del.sync(path.join(__dirname, '../dist/src/*.js'))

const files = glob.GlobSync(path.join(__dirname, '../dist/src/*')).found
files.forEach((f) => {
    fsExtra.moveSync(f, path.join(__dirname, '../dist/', path.basename(f)), { overwrite: true })
})

del.sync(path.join(__dirname, '../dist/src'))
del.sync(path.join(__dirname, '../dist/package.json'))

