/**
 * 服务中间件，模拟PC后端
 * @Author     SUNXG
 * @CreateTime 2016-11-07T17:21:56+0800
 */
export default function (req, res, next) {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
  // console.log(assetsByChunkName)

  // 处理一些必要的访问404
  switch (req.path) {
    case '/common.css':
      return res.type('text/css').end()
  }

  // 路径中包含.或者是请求协议模板，直接跳过
  if (req.path.includes('.') || req.path.includes('/directwaterbucket')) {
    return next()
  }

  // 提取当前业务
  let page = req.path.split('/')[1]
  if (page == '' || page == 'detail') {
    page = 'licai'
  }
  // console.log('business-->', page)

  // 过滤当前业务所需的CSS和JS资源
  const cssAssets = ['common.css'], jsAssets = ['common.js']
  Object.entries(assetsByChunkName).forEach(([chunkName, assets]) => {
    if (page == chunkName) {
      const assetList = Array.isArray(assets) ? assets : [assets]
      assetList.forEach(asset => {
        if (asset.endsWith('.css')) {
          cssAssets.push(asset)
        } else if (asset.endsWith('.js')) {
          jsAssets.push(asset)
        }
      })
    }
  })
  // console.log(cssAssets, jsAssets)

  res.send(`
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <title>爱屋吉屋PC</title>
  <meta name="keywords" content="爱屋吉屋">
  <meta name="description" content="爱屋吉屋">
  <link rel="shortcut icon" href="/global/img/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  ${cssAssets.map(cssAsset => `<link rel="stylesheet" href="/${cssAsset}">`).join('')}

  <script>
  ;(function() {
    if (location.hostname.indexOf('iwlicai.com') != -1 && location.protocol == 'http:') {
      location.href = location.href.replace('http://', 'https://')
    }
  })();

  window.pageConfig = {
    siteUrl: '${req.protocol}://${req.get('host')}',
    mainSiteUrl: '//www.iwjw.com',
    mobileSiteUrl: '//m.iwjw.com',
    alcMobileSiteUrl: '//mbeta.iwlicai.com',
    datacollectUrl: '//plog.iwjw.com/dataCollect/',
    staticUrl: '${req.protocol}://${req.get('host')}/',
    // staticUrl: '/',
    staticTag: 'licai'
  };
  </script>
</head>

<body>
  <div id="iwjw">
    <div class="mod-header" id="mod-header"></div>
    <div class="mod-main ${`mod-${page}`}" id="${`mod-${page}`}">
      <!-- 内容将会渲染在这 -->
    </div>
  </div>
  <div class="mod-footer" id="mod-footer"></div>

  <!--[if IE 8]> <script src="/global/module/es5-shim-sham.js"></script> <![endif]-->
  ${jsAssets.map(jsAsset => `<script src="/${jsAsset}"></script>`).join('')}
</body>

</html>
    `)
}
