/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-12-25
 **/

// createElement 有 3 个参数
// 第一个参数必选
// 第二个参数可选，数据对象
// 第三参数可选，子节点

createElement(
  //  {String | Object | Function}
  //  一个 HTML 标签，组件选项，或是一个函数
  // 必须 return 上述其中一个

  // {Object}
  // 一个对应属性的数据对象，可选
  // 可以在 template 使用
  {
    // 具体选项将下文 第二参数（可选）
  },


)

// e.g.
// render: function (createElement) {
//   return createElement(
//     'div', {
//       class: {
//         'foo': true
//       }
//     },
//     [
//       createElement('h1', 'Hello world'),
//       createElement('span', '你好')
//     ]
//   )
// }

// 第二个参数（可选）