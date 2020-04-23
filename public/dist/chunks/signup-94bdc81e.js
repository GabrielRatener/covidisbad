import 'vue';
import 'vuetify';
import 'vue-the-mask';
import 'vuex';
import { t as testUserName, p as passwordTests, e as extractDigits, s as signUp, _ as __vue_normalize__ } from './main-626a0c56.js';
import 'vue-router';
import 'validator';

//

var script = {
  data: () => ({
    auth: {
      valid: true,
      name: "",
      email: "",
      nameRules: testUserName,
      emailRules: [ 
        v => !!v || "Email is required", 
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      password: "",
      passwordRules: passwordTests.map(line => { 
        return (v) => line.test(v) ? true : line.description ;
      }),
      confirmPassword: "",
      passwordMatch: [v => !!v],
      phone: "",
      visible: false
    },
    rules: {

    }
  }),
  methods: {
    submit() {
      const data = {
        name: this.auth.name,
        email: this.auth.email,
        password: this.auth.password,
        phone:
          extractDigits(this.auth.phone)
            .slice(-10)
      };
      
      signUp(data)
        .then((user) => {
          console.log("here we go");
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
    { attrs: { heading: "Sign Up", align: "align" } },
    [
      _c(
        "v-form",
        {
          attrs: { "lazy-validation": "lazy-validation" },
          model: {
            value: _vm.valid,
            callback: function($$v) {
              _vm.valid = $$v;
            },
            expression: "valid"
          }
        },
        [
          _c("v-text-field", {
            attrs: { "prepend-icon": "person", label: "Full Name" },
            model: {
              value: _vm.auth.name,
              callback: function($$v) {
                _vm.$set(_vm.auth, "name", $$v);
              },
              expression: "auth.name"
            }
          }),
          _c("v-text-field", {
            attrs: {
              "prepend-icon": "person",
              label: "Email",
              rule: _vm.auth.emailRules
            },
            model: {
              value: _vm.auth.email,
              callback: function($$v) {
                _vm.$set(_vm.auth, "email", $$v);
              },
              expression: "auth.email"
            }
          }),
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "12", sm: "6" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-icon": "lock",
                      "append-icon": _vm.auth.visible
                        ? "visibility"
                        : "visibility_off",
                      label: "Password",
                      type: _vm.auth.visible ? "text" : "password",
                      rules:
                        _vm.auth.password.length > 0
                          ? _vm.auth.passwordRules
                          : []
                    },
                    on: {
                      "click:append": function($event) {
                        _vm.auth.visible = !_vm.auth.visible;
                      }
                    },
                    model: {
                      value: _vm.auth.password,
                      callback: function($$v) {
                        _vm.$set(_vm.auth, "password", $$v);
                      },
                      expression: "auth.password"
                    }
                  })
                ],
                1
              ),
              _c(
                "v-col",
                { attrs: { cols: "12", sm: "6" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      "prepend-icon": "lock",
                      "append-icon": _vm.auth.visible
                        ? "visibility"
                        : "visibility_off",
                      label: "Confirm Password",
                      type: _vm.auth.visible ? "text" : "password",
                      rules:
                        _vm.auth.password.length > 0
                          ? _vm.auth.passwordMatch
                          : []
                    },
                    on: {
                      "click:append": function($event) {
                        _vm.auth.visible = !_vm.auth.visible;
                      }
                    },
                    model: {
                      value: _vm.auth.confirmPassword,
                      callback: function($$v) {
                        _vm.$set(_vm.auth, "confirmPassword", $$v);
                      },
                      expression: "auth.confirmPassword"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _c(
            "v-cols",
            { attrs: { cols: "12", sm: "6" } },
            [
              _c("v-text-field", {
                directives: [
                  {
                    name: "mask",
                    rawName: "v-mask",
                    value: "+1(###)-###-####",
                    expression: "'+1(###)-###-####'"
                  }
                ],
                attrs: { "prepend-icon": "phone", label: "Phone Number" },
                model: {
                  value: _vm.auth.phone,
                  callback: function($$v) {
                    _vm.$set(_vm.auth, "phone", $$v);
                  },
                  expression: "auth.phone"
                }
              })
            ],
            1
          ),
          _c(
            "v-btn",
            {
              attrs: { color: "success" },
              on: {
                click: function($event) {
                  return _vm.submit()
                }
              }
            },
            [_vm._v("Sign Up")]
          ),
          _c(
            "router-link",
            { staticClass: "float-right", attrs: { to: "/login" } },
            [_vm._v("Log in instead")]
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
