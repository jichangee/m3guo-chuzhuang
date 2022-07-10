import fs from 'fs'

const listPath = '../src/lib/list.js'
const listStr = fs.readFileSync(listPath).toString()
const prefix = 'export default '
let list = JSON.parse(listStr.replace(prefix, ''))

const appendItem = {
  hero_name: '孔融',
  equip: 'https://s2.loli.net/2022/07/10/WYPOi6ZnyFUB39e.png',
  hero_icon: '',
  key: list.length
}

const oldItem = list.find(item => item.hero_name === appendItem.hero_name)

if (oldItem) {
  appendItem.hero_icon = oldItem.hero_icon
}
list = [appendItem].concat(list)

fs.writeFileSync(listPath, `${prefix}${JSON.stringify(list)}`)

console.log('appendItem', appendItem);