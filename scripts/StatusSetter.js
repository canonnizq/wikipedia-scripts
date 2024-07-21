$.when(
    $.ready,
    mw.loader.using('mediawiki.api')
).then(function () {

    // check for config options, and set them to default values if undefined
    if (typeof (statusSetterConfig) == 'undefined') { // create variable to store configuration
        statusSetterConfig = {};
    }

    if (typeof (statusSetterConfig.statusList) == 'undefined') { // all available statuses
        statusSetterConfig.statusList = ['somewhere', 'in', 'editing', 'online', 'offline', 'busy', 'sleeping', 'wikibreak', 'away', 'vandal', 'holiday', 'school', 'working', 'eating', 'huggle', 'twinkle']; // copied from [[Template:UserStatus]]
    }

    if (typeof (statusSetterConfig.statusPage) == 'undefined') {
        statusSetterConfig.statusPage = 'User:' + mw.config.get('wgUserName') + '/Status';
    }

    //make the edit
    function makeListener(newStatus) {
        return function (evt) {
            evt.preventDefault();
            var api = new mw.Api({
                ajax: { headers: { 'Api-User-Agent': '[[User:CanonNi/Scripts/StatusSetter.js]]' } }
            });

            api.postWithEditToken({
                action: 'edit',
                title: statusSetterConfig.statusPage,
                text: newStatus,
                summary: 'Set status to ' + newStatus + ' using [[User:CanonNi/Scripts/StatusSetter|StatusSetter]]'
            }).then(function () {
                api.post({ action: 'purge', titles: 'User:' + mw.config.get('wgUserName') });
                mw.notify('Done setting status!');
            });
            return false;
        };
    }

    // add the links, but only if on own user/talk page
    if (mw.config.get('wgTitle') === mw.config.get('wgUserName') | mw.config.get('wgPageName') === 'User:CanonNi/Scripts/StatusSetter') {
        mw.util.addPortlet('p-status', 'Status', '#p-cactions');
        for (var i = 0; i < statusSetterConfig.statusList.length; i++) {
            var stat = statusSetterConfig.statusList[i];

            mw.util.addPortletLink(
                'p-status',
                '#',
                stat.charAt(0).toUpperCase() + stat.slice(1), // link text, capitalized
                'pt-status-' + stat, // id of new button
                'Set status to ' + stat, // hover text
            )
                .addEventListener('click', makeListener(stat));
        };
    };
});
