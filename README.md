# uxcore-dialog
---

- tags: uxcore, dialog
- description: uxcore dialog
- maintainers: vincent.bian
- version: 1.0.0
- lastupdate: 2015/7/12
- screenshots:

## TL;DR

### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-dialog
$ cd uxcore-dialog
$ npm install
$ npm run dev
```
then nav http://localhost:9090/example/ to see the demo

## Usage

```js
var Dialog = require('uxcore-dialog');
React.render(
  (<Dialog title={title} onClose={callback1} onShow={callback2}>
    <p>dialog content</p>
  </Dialog>),
  document.getElementById('content')
);
```

### demo
http://uxcore.github.io/uxcore-dialog/example/

## API

### props

|name|type|default|description|
|----|----|-------|-----------|
|prefixCls|String|kuma-dialog|The dialog dom node's prefixCls|
|visible|Boolean|false| |
|mask|Boolean| |whether show mask|
|renderToBody|Boolean|true|whether render dialog to body|
|animation|String| |part of dialog animation css class name|
|maskAnimation|String| |part of dialog's mask animation css class name|
|title|String|React.Element|Title of the dialog|
|footer|React.Element| |footer of the dialog|
|closable|Boolean|true|whether show close button and click mask to close|
|onBeforeClose|function(close)| |when click close button or mask. argument is a close function|
|onShow|function| |called on dialog show|
|onClose|function| |called on dialog close|
