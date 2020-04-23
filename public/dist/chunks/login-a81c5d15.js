import 'vue';
import 'vuetify';
import 'vue-the-mask';
import 'vuex';
import { l as logIn, _ as __vue_normalize__ } from './main-626a0c56.js';
import 'vue-router';

//

var script = {
  data: () => ({
    auth: {
      email: "",
      password: "",
      visible: false
    }
  }),
  methods: {
    submit() {

      logIn({
        email: this.auth.email,
        password: this.auth.password,
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "app-layout-responsive",
    { attrs: { heading: "Log In", align: "align" } },
    [
      _c(
        "v-form",
        [
          _c("v-text-field", {
            attrs: { label: "Email", "prepend-icon": "person" },
            model: {
              value: _vm.auth.email,
              callback: function($$v) {
                _vm.$set(_vm.auth, "email", $$v);
              },
              expression: "auth.email"
            }
          }),
          _c("v-text-field", {
            attrs: {
              "prepend-icon": "lock",
              "append-icon": _vm.auth.visible ? "visibility" : "visibility_off",
              label: "Password",
              type: _vm.auth.visible ? "text" : "password"
            },
            on: {
              "click:append": function($event) {
                _vm.auth.visible = !_vm.auth.visible;
              },
              keyup: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.submit()
              }
            },
            model: {
              value: _vm.auth.password,
              callback: function($$v) {
                _vm.$set(_vm.auth, "password", $$v);
              },
              expression: "auth.password"
            }
          }),
          _c(
            "v-btn",
            {
              attrs: { color: "primary" },
              on: {
                click: function($event) {
                  return _vm.submit()
                }
              }
            },
            [_vm._v("Log In")]
          ),
          _c(
            "router-link",
            { staticClass: "float-right", attrs: { to: "/signup" } },
            [_c("p", [_vm._v("Don't have an account? Sign up")])]
          ),
          _c("v-spacer", [_c("p")])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
