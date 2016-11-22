# uxcore-dialog

Dialog Component base on React.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devdep-image]][devdep-url] 
[![NPM downloads][downloads-image]][npm-url]
[![Sauce Test Status][sauce-image]][sauce-url]

[npm-image]: http://img.shields.io/npm/v/uxcore-dialog.svg?style=flat-square
[npm-url]: http://npmjs.org/package/uxcore-dialog
[travis-image]: https://img.shields.io/travis/uxcore/uxcore-dialog.svg?style=flat-square
[travis-url]: https://travis-ci.org/uxcore/uxcore-dialog
[coveralls-image]: https://img.shields.io/coveralls/uxcore/uxcore-dialog.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/uxcore/uxcore-dialog?branch=master
[dep-image]: http://img.shields.io/david/uxcore/uxcore-dialog.svg?style=flat-square
[dep-url]: https://david-dm.org/uxcore/uxcore-dialog
[devdep-image]: http://img.shields.io/david/dev/uxcore/uxcore-dialog.svg?style=flat-square
[devdep-url]: https://david-dm.org/uxcore/uxcore-dialog#info=devDependencies
[downloads-image]: https://img.shields.io/npm/dm/uxcore-dialog.svg
[sauce-image]: https://saucelabs.com/browser-matrix/uxcore-dialog.svg
[sauce-url]: https://saucelabs.com/u/uxcore-dialog

### Development

```sh
git clone https://github.com/uxcore/uxcore-dialog
cd uxcore-dialog
npm install
npm run server
```

if you'd like to save your install time，you can use uxcore-tools globally.

```sh
npm install uxcore-tools -g
git clone https://github.com/uxcore/uxcore-dialog
cd uxcore-dialog
npm install
npm run dep
npm run start
```

### Test Case

```sh
npm run test
```

### Coverage

```sh
npm run coverage
```

## Demo

http://uxcore.github.io/components/dialog

## API

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | Title of the dialog | String | React.Element    | 无           |
| visible      | current dialog's visible status  | Boolean    | false |
| mousePosition |  set pageX and pageY of current mouse(it will cause transform origin to be set). | {x:number,y:number}   | 无 |
| onOk       | the callback when ok clicked | function | 无 |
| onCancel   | the callback when dialog closed  | function  | 无  |
| width      | dialog width | String or Number | 520           |
| footer     | footer of the dialog       | React.Element    |  |
| closable | whether show close button and click mask to close | Boolean | true |
| maskClosable | whether click mask to close, this prop will be ignored if set closable prop to false | Boolean | true |
| locale     | 国际化(包括 `zh-cn`, `en-us`, 和 `pl-pl`)    | String     |  `zh-cn` |
| className | additional className for dialog | string | |
| wrapClassName | additional className for dialog wrap | string | `vertical-center-dailog` for vertical align the dialog |
| style | Root style for dialog element.Such as width, height | Object | {} |
| zIndex |  | Number | |
| bodyStyle | body style for dialog body element.Such as height | Number | {} |
| htmlClassName | the className added to html element when dialog is visible | String | '' |

### Dialog.xxx()

包括：

- `Dialog.info`
- `Dialog.success`
- `Dialog.error`
- `Dialog.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | React.Element or String    | 无           |
| onOk       | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭      | function         | 无           |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭       | function         | 无           |
| width      | 宽度           | String or Number | 416           |
| buttonSize  |  按钮的尺寸，'small', 'medium', 'large' 三种可选 | String | 'medium'|
| iconClassName | 图标样式名 | String | kuma-icon-caution |
| timer | 弹框自动关闭, 2000表示2s以后关闭 | Number, false or null | false |
| htmlClassName | the className added to html element when dialog is visible | String | '' |
