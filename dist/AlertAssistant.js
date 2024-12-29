"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// Nobody reads source code, so as a reward, here's a extra private video of me, enjoy: [https://www.youtube.com/watch?v=dQw4w9WgXcQ]
// <nowiki>

$(function () {
  var topicList = {
    aa: 'Armenia, Azerbaijan, or related conflicts',
    'a-i': 'the Arab–Israeli conflict',
    ab: 'abortion',
    acu: 'complementary and alternative medicine',
    ap: 'post-1992 politics of the United States and closely related people',
    at: 'the English Wikipedia article titles policy and Manual of Style',
    b: 'the Balkans or Eastern Europe ',
    blp: 'articles about living or recently deceased people, and edits relating to the subject (living or recently deceased) of such biographical articles',
    cc: 'climate change',
    cid: ' discussions about infoboxes and to edits adding, deleting, collapsing, or removing verifiable information from infoboxes',
    covid: 'COVID-19, broadly construed',
    fg: 'Falun Gong',
    gc: 'governmental regulation of firearm ownership; the social, historical and political context of such regulation; and the people and organizations associated with these issues',
    gg: 'gender-related disputes or controversies or people associated with them',
    gmo: 'genetically modified organisms, commercially produced agricultural chemicals and the companies that produce them, broadly construed',
    horn: 'the Horn of Africa (defined as including Ethiopia, Somalia, Eritrea, Djibouti, and adjoining areas if involved in related disputes)',
    ipa: 'India, Pakistan, and Afghanistan',
    irp: 'post-1978 Iranian politics',
    kurd: 'the topics of Kurds and Kurdistan, broadly construed',
    ps: 'pseudoscience and fringe science',
    'r-i': 'the intersection of race/ethnicity and human abilities and behaviour',
    rne: 'the results of any national or sub-national election',
    sl: 'Sri Lanka',
    tt: 'The Troubles',
    ya: 'Yasuke'
  };
  function sendAlert(user, template, topic) {
    var newWikitext;
    var editSummary;
    switch (template) {
      case 'intro':
        newWikitext = "\n\n{{subst:alert/first|".concat(topic, "}} ~~~~");
        editSummary = "Introduction to [[WP:CT|contentious topics]]: ".concat(topic, ") ([[User:CanonNi/Scripts/AlertAssistant|AA]]");
        break;
      case 'alert':
        newWikitext = "\n\n==Contentious topic alert==\n{{subst:alert|".concat(topic, "}} ~~~~");
        editSummary = "[[WP:CT|Contentious topic]] alert: ".concat(topic, ") ([[User:CanonNi/Scripts/AlertAssistant|AA]]");
        break;
      default:
        newWikitext = "{{error|AlertAssistant error! Please revert edit and report bug.}}";
        editSummary = "AlertAssistant error! Please revert edit and report bug.";
        break;
    }
    return new mw.Api().edit("User talk:".concat(user), function (revision) {
      return {
        text: revision.content + newWikitext,
        summary: editSummary
      };
    });
  }
  var MainDialog = /*#__PURE__*/function (_OO$ui$ProcessDialog) {
    function MainDialog(config) {
      _classCallCheck(this, MainDialog);
      return _callSuper(this, MainDialog, [config]);
    }
    _inherits(MainDialog, _OO$ui$ProcessDialog);
    return _createClass(MainDialog, [{
      key: "initialize",
      value: function initialize() {
        _superPropGet(MainDialog, "initialize", this, 3)([]);
        this.panel = new OO.ui.PanelLayout({
          padded: true,
          expanded: false
        });
        this.fieldset = new OO.ui.FieldsetLayout({
          label: 'Customize alert'
        });
        this.topicsDropdown = new OO.ui.DropdownWidget({
          label: 'Active topics',
          menu: {
            items: Object.keys(topicList).map(function (key) {
              return new OO.ui.MenuOptionWidget({
                data: key,
                label: topicList[key]
              });
            })
          }
        });
        this.selectorButtons = new OO.ui.ButtonSelectWidget({
          items: [new OO.ui.ButtonOptionWidget({
            data: 'intro',
            icon: 'lightbulb',
            label: 'Intro'
          }), new OO.ui.ButtonOptionWidget({
            data: 'alert',
            icon: 'infoFilled',
            label: 'Regular'
          })

          // will implement in the future
          /* new OO.ui.ButtonOptionWidget({
              data: 'sanction',
              icon: 'error',
              label: 'Sanctions',
          }), */]
        });
        this.fieldset.addItems([new OO.ui.FieldLayout(this.topicsDropdown), new OO.ui.FieldLayout(this.selectorButtons)]);
        this.panel.$element.append(this.fieldset.$element);
        this.$body.append(this.panel.$element);
      }
    }, {
      key: "getSetupProcess",
      value: function getSetupProcess() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _superPropGet(MainDialog, "getSetupProcess", this, 3)([data]).next(function () {});
      }
    }, {
      key: "getActionProcess",
      value: function getActionProcess(action) {
        var _this = this;
        if (action === 'send') {
          var username = mw.config.get('wgTitle');
          var selectedTopic = this.topicsDropdown.getMenu().findSelectedItem().getData();
          var selectorMenu = this.selectorButtons.findSelectedItem().getData();
          return new OO.ui.Process(function () {
            sendAlert(username, selectorMenu, selectedTopic).then(function () {
              sendAlert(username, selectorMenu, selectedTopic).then(function () {
                console.log('successfully sent alert');
                _this.close();
              })["catch"](function (err) {
                console.error('error sending alert: ', err);
                OO.ui.alert('Failed to send alert! Check console for errors and retry.');
              });
            });
          });
        }
        return _superPropGet(MainDialog, "getActionProcess", this, 3)([action]);
      }
    }, {
      key: "getTeardownProcess",
      value: function getTeardownProcess(data) {
        return _superPropGet(MainDialog, "getTeardownProcess", this, 3)([data]).first(function () {});
      }
    }], [{
      key: "static",
      get: function get() {
        return {
          name: 'mainDialog',
          title: 'AlertAssistant',
          actions: [{
            flags: ['primary', 'progressive'],
            label: 'Send',
            action: 'send'
          }, {
            flags: 'safe',
            icon: 'close',
            label: 'Cancel',
            invisibleLabel: true
          }]
        };
      }
    }]);
  }(OO.ui.ProcessDialog);
  if (mw.config.get('wgNamespaceNumber') === 3) {
    mw.util.addPortletLink('p-cactions', '#', 'AlertAssistant', 'ca-aa', 'Alert about contentious topics');
    $('#ca-aa').on('click', function (event) {
      event.preventDefault();
      var windowManager = new OO.ui.WindowManager();
      $(document.body).append(windowManager.$element);
      var mainDialog = new MainDialog();
      windowManager.addWindows([mainDialog]);
      windowManager.openWindow(mainDialog);
    });
  }
});

// </nowiki>