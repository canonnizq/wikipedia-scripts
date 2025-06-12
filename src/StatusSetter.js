$(() => {
  const statusList = [
    'somewhere',
    'in',
    'editing',
    'online',
    'offline',
    'busy',
    'sleeping',
    'wikibreak',
    'away',
    'vandal',
    'holiday',
    'school',
    'working',
    'eating',
    'huggle',
    'twinkle',
  ];

  function makeListener(newStat) {
    return (event) => {
      event.preventDefault();
      new mw.Api()
        .edit(`User:${mw.config.get('wgUserName')}/Status`, () => {
          return {
            text: newStat,
            summary: `Set status to ${newStat}) ([[User:CanonNi/Scripts/StatusSetter|SS]]`,
          };
        })
        .then(() => {
          mw.notify('Done setting status!');
          location.reload();
        });
    };
  }

  if (mw.config.get('wgPageName').includes(mw.config.get('wgUserName'))) {
    mw.util.addPortlet('p-status', 'Status', '#p-cactions');
    statusList.forEach((stat) => {
      mw.util
        .addPortletLink(
          'p-status',
          '#',
          stat.charAt(0).toUpperCase() + stat.slice(1),
          `status-${stat}`,
          `Set status to ${stat}`
        )
        .addEventListener('click', makeListener(stat));
    });
  }
});
