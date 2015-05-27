# uxcore-dialog
---

uxcore-dialog core


```sh
$ git clone https://github.com/uxcore/uxcore-dialog
$ cd uxcore-dialog
$ npm install
$ npm run dev
```

then nav http://localhost:9090/example/ to see the demo

### demo 
http://uxcore.github.io/uxcore-dialog/example/

## API

### props

| name | default | type | description |
| ---- | ------- | ---- | ----------- |
| jsxwidth | 400 | string or number | dialog width |
| jsxheight| auto| string or number |dialog height |
| jsxclsPrefix | uxcore-dialog | string |class prefix for dialog |
| jsxtitle | title | string | dialog title |
| jsvisible | false | boolean | the dialog whether or not shown |
| jsxcancel | true | boolean or string | can be bool or string, if the value type is string, the value will be used as button's text |
| jsxconfirm | true | boolean or string | same as jscancel |
| jsoverlay | true | boolean  | show overlay |
| jsxdraggable | false | boolean | the dialog can be draggable |
| onBeforeClose | noop | function | called before dialog close |
| onClose | noop | function| when the dialog closed, the callback was called |
| onShow | noop | function| when the dialog shown, the callback was called |
