# uxcore-dialog
---

## TL;DR

dialog ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-dialog
$ cd uxcore-dialog
$ npm install
$ gulp server
```

## Usage

```js
var Dialog = require('uxcore-dialog');
React.render(
  (<Dialog title="第一个 Dialog"
      visible={this.state.visible}
      onOk={this.handleOk.bind(this)}
      onCancel={this.handleCancel.bind(this)}>
      <p>对话框的内容</p>
  </Dialog>),
  document.getElementById('content')
);
```

## demo

见 http://uxcore.github.io/uxcore/components/dialog/

## API

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | React.Element    | 无           |
| visible      | 对话框是否可见  | Boolean    | 无           |
| mousePosition      | 鼠标位置，设置弹窗初始位置           | {x:number,y:number}   | 无           |
| onOk       | 点击确定回调       | function         | 无           |
| onCancel   | 点击遮罩层或右上角叉或取消按钮的回调  | function  | 无           |
| width      | 宽度           | String or Number | 520           |
| footer     | 底部内容       | React.Element    | 确定取消按钮 |
| closable | whether show close button and click mask to close | Boolean | true |
| maskClosable | whether click mask to close, this prop will be ignored if set closable prop to false | Boolean | true |
| locale     | 国际化(包括 `zh-cn`, `en-us`, 和 `pl-pl`)    | String     |  `zh-cn`

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
