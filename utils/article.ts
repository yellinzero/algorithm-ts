
export function getWords(artName: string): string[] {
    const fs = require('fs')
    const path = require('path')
    const articleAttr = path.join(__dirname, '../data/articles/' + artName)
    let article = fs.readFileSync(articleAttr, { encoding: 'UTF-8' })
    if (article) {
        article = article.replace(/\.|,|\s/g, ' ').replace(/\s+/g, ' ').trim()
        return article.split(' ')
    }
    return []
}