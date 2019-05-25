const rd = require('rd')
const fs = require('fs')
const path = require('path')
const config = require('config')

const dir = config.srcDir
const tardir = config.tarDir

function main() {
    const types = {
        // ext: dist sub dir
        '.txt': 'txt',
        '.pdf': 'pdf',
        '.epub': 'epub',
        '.mobi': 'mobi',
        '.azw': 'azw',
        '.azw3': 'azw3'
    }
    Object.keys(types).map(key => {
        let distSubDir = types[key]
        fs.mkdir(`${tardir}${distSubDir}`, function (err) {

        })
    })
    
    rd.each(dir, function(file, stat, next) {
        // rm  metadata.opf & cover.jpg files
        if (file.endsWith('metadata.opf') || file.endsWith('cover.jpg')) {
            fs.unlink(file, function (err) {
                if (!err) {
                    console.log(`unlink file ${file} done.`)
                }
            })
        }
        const basename = path.basename(file)
        // move files
        Object.keys(types).map(key => {
            if (basename.endsWith(key)) {
                let distSubDir = types[key]
                fs.rename(file, `${tardir}${distSubDir}/${basename}`, function (err) {

                })
            }
        })

        next()
    }, function (err) {

    })
}

main()
