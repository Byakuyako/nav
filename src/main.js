const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn'
  },
  {
    logo: 'B',
    url: 'https://www.bilibili.com'
  }
]

const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach(node => {
    const $li = $(`<li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
            </div>
        </a>     
      </li>`).insertBefore($lastLi)
  })
}

render()

$('.addButton').on('click', () => {
  let url = window.prompt('请问要添加的网址是?')

  if (url.indexOf("http") !== 0) {
    url = 'https://' + url
  }
  console.log(url)

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  })
  render()

})

window.onbeforeunload = () => {
  console.log('页面要关闭了')
  const string = JSON.stringify(hashMap)

  localStorage.setItem('x', string)
}


//
// $('.addButton').on('click', () => {
//     let url = window.prompt('请问要添加的网址是?')
//
//
//     if (url.indexOf('http') !== 0){
//         url = 'https://' + url
//     }
//     console.log(url)
//
//     const $siteList = $('.siteList')
//     const $lastLi = $siteList.find('li.last') //^^^^li.last 是jq的api吧
//     const $li = $(`<li>
//         <a href="${url}">
//             <div class="site">
//                 <div class="logo">${url[0]}</div>
//                 <div class="link">${url}</div>
//             </div>
//         </a>
//       </li>`).insertBefore($lastLi)
//
// })