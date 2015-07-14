webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n__webpack_require__(39);\n\nvar _react = __webpack_require__(59);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _indexJs = __webpack_require__(60);\n\nvar _indexJs2 = _interopRequireDefault(_indexJs);\n\nfunction close() {\n    console.log('close');\n}\nfunction show() {\n    console.log('show');\n}\n\n_react2['default'].render(_react2['default'].createElement(\n    'div',\n    null,\n    _react2['default'].createElement(\n        'p',\n        null,\n        'does not support render visible on server!'\n    ),\n    _react2['default'].createElement(\n        _indexJs2['default'],\n        {\n            title: '第一个弹框',\n            width: '500',\n            zIndex: 100,\n            visible: true,\n            onClose: close,\n            onShow: show\n        },\n        _react2['default'].createElement(\n            'p',\n            null,\n            '第一个dialog'\n        )\n    )\n), document.getElementById('content'));\n\n/*****************\n ** WEBPACK FOOTER\n ** ./example/simple.jsx\n ** module id = 0\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./example/simple.jsx?");

/***/ }
]);