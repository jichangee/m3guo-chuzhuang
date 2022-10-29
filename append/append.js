import fs from 'fs'

const listPath = '../src/lib/list.js'
const listStr = fs.readFileSync(listPath).toString()
const prefix = 'export default '
let list = JSON.parse(listStr.replace(prefix, ''))

const appendItem = {
  hero_name: '顾雍',
  equip: 'https://raw.githubusercontent.com/jichangee/gallery/master/m3guo/20221029214622.png',
  hero_icon: '',
  key: list.length
}

let appendIndex = list.findIndex(item => item.hero_name === appendItem.hero_name)

if (appendIndex > -1) {
  appendItem.hero_icon =  appendItem.hero_icon || list[appendIndex].hero_icon
  appendItem.key =  list[appendIndex].key
  list.splice(appendIndex, 1, appendItem)
} else {
  list = [appendItem].concat(list)
}

fs.writeFileSync(listPath, `${prefix}${JSON.stringify(list)}`)

console.log('appendItem', appendItem);