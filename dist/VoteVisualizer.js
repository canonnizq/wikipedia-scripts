"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var shortConfig = {
  'support agree endorse accept good_block': '9/94/Symbol_support_vote.svg',
  'keep allow permit': 'd/d0/Symbol_keep_vote.svg',
  'oppose disagree overturn object disallow decline bad_block opposition objection': '7/7f/Symbol_oppose_vote.svg',
  'delete remove pull': '8/89/Symbol_delete_vote.svg',
  'neutral meh ambivalent unsure': '8/89/Symbol_neutral_vote.svg',
  'merge upmerge': 'b/b0/Symbol_merge_vote.svg',
  'move transwiki convert transwikify': '5/50/Symbol_move_vote.svg',
  'redirect retarget repost': '0/0c/Symbol_redirect_vote.svg',
  'relist change recuse refine mixed': 'b/ba/Symbol_opinion_vote.svg',
  'comment note comments statement': 'e/e0/Symbol_comment_vote.svg',
  'delist demote': 'f/f6/Symbol_unsupport_vote.svg',
  'question query request inquiry': 'e/e0/Symbol_question.svg',
  'disambiguate dab dabify set_index sia': '2/2a/Symbol_dab_class.svg',
  'wait hold postpone': '5/54/Symbol_wait.svg',
  rename: '0/0a/Symbol_rename_vote.svg',
  'undelete restore': 'c/c5/Symbol_support2_vote.svg',
  'close speedy_close no_consensus bad_rfc invalid_rfc': '3/3b/Symbol_no_support_vote.svg',
  split: '0/0d/Symbol_split_vote.svg',
  'abstain abstention unnecessary moot mu irrelevant void': '6/61/Symbol_abstain_vote.svg',
  'draftify incubate': '0/09/Symbol_draft_class.svg',
  userfy: '1/13/Symbol_user_class.svg',
  'listify blurb': 'd/db/Symbol_list_class.svg',
  reply: 'd/d2/Symbol_reply.svg',
  salt: '6/66/Symbol_create_protect_vote.svg',
  'withdraw withdrawn': '8/85/Symbol_unrelated.svg',
  'information info': '8/8c/Symbol_information_vote.svg',
  'update answer': '1/18/Symbol_version_future.svg',
  'snow snowball': 'd/d3/Bouncing_Snowball.png',
  'blank keep_blanked': '1/1b/Symbol_plain_white.svg',
  'speedy speedy_delete': '6/6d/Symbol_speedy_delete_vote.svg',
  speedy_keep: 'b/bc/Symbol_speedy_keep_vote.svg',
  speedy_redirect: '2/22/Symbol_speedy_redirect_vote.svg',
  'strong_support strongly_support strong_agree strongly_agree strongest_support': '8/84/Symbol_strong_support_vote.svg',
  'strong_oppose strongly_oppose strong_disagree strongly_disagree strong_object strongly_object strong_opposition strong_objection strongest_oppose': '5/5e/Symbol_oppose_vote_oversat.svg',
  'weak_support weakly_support weak_agree weakly_agree weakest_support support-ish': '8/8c/GA_candidate.svg',
  'weak_oppose weakly_oppose weak_disagree weakly_disagree weak_object weakly_object weak_opposition weakest_oppose oppose-ish': 'f/f5/BA_candidate.svg',
  'partial_support conditional_support semi-support': 'b/b2/Symbol_conditional_support.svg',
  ongoing: 'e/e3/Symbol_wait_blue.svg',
  'tag retag': '8/83/Symbol_template_class_pink.svg',
  'historical tag_historical deprecate': 'c/c5/Symbol_mark_historical_vote.svg',
  speedy_merge: '6/63/Symbol_speedy_merge_vote.svg',
  speedy_rename: '0/0a/Symbol_speedy_rename_vote.svg',
  'suggestion suggest': 'a/a2/Symbol_suggestion_vote.svg',
  'substitute subst': '5/5c/Symbol_template_class.svg',
  'rd recent_death': '1/14/Symbol_death.svg'
};

/* Sup. Nobody reads source code, so as a reward, here's an extra secret video of me, enjoy: [https://www.youtube.com/watch?v=dQw4w9WgXcQ]. */

$(function () {
  var namespaces = [1, 3, 4, 5, 7, 9, 11, 13, 15, 101, 119, 127, 711, 829];
  if (!namespaces.includes(mw.config.get('wgNamespaceNumber'))) return;
  var longConfig = {};
  Object.entries(shortConfig).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    key.split(' ').forEach(function (keyword) {
      longConfig[keyword.replace('_', ' ')] = value;
    });
  });
  Array.from(document.body.getElementsByClassName('B')).forEach(function (boldElement) {
    boldElement.textContent.replace(/[<>/]/g, ' ').split(' ').forEach(function (boldWord) {
      var voteSymbol = longConfig[boldWord.toLowerCase().replace(/[.,!:;+]/g, '')];
      if (voteSymbol) {
        var imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/".concat(voteSymbol, "/30px-").concat(voteSymbol.replace(/..\/..\/(.*)/, '$1'));
        var finalUrl = voteSymbol.endsWith('.svg') ? "".concat(imageURL, ".png") : imageUrl;
        boldElement.innerHTML = "<img src=\"".concat(finalUrl, "\" alt=\"").concat(boldElement.textContent, " vote\" height=\"15\" /> ").concat(boldElement.innerHTML);
      }
    });
  });
});