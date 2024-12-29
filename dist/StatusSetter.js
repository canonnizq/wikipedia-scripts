"use strict";

$(function () {
  var statusList = ['somewhere', 'in', 'editing', 'online', 'offline', 'busy', 'sleeping', 'wikibreak', 'away', 'vandal', 'holiday', 'school', 'working', 'eating', 'huggle', 'twinkle'];
  function makeListener(newStat) {
    return function (event) {
      event.preventDefault();
      new mw.Api().edit("User:".concat(mw.config.get('wgUserName'), "/Status"), function () {
        return {
          text: newStat,
          summary: "Set status to ".concat(newStat, ") ([[User:CanonNi/Scripts/StatusSetter|SS]]")
        };
      }).then(function () {
        mw.notify('Done setting status!');
        location.reload();
      });
    };
  }
  if (mw.config.get('wgPageName').includes(mw.config.get('wgUserName'))) {
    mw.util.addPortlet('p-status', 'Status', '#p-cactions');
    statusList.forEach(function (stat) {
      mw.util.addPortletLink('p-status', '#', stat.charAt(0).toUpperCase() + stat.slice(1), "status-".concat(stat), "Set status to ".concat(stat)).addEventListener('click', makeListener(stat));
    });
  }
});