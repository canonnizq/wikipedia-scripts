// Nobody reads source code, so as a reward, here's a extra private video of me, enjoy: [https://www.youtube.com/watch?v=dQw4w9WgXcQ]
// <nowiki>

$(() => {
  const topicList = {
    'a-a': 'Armenia, Azerbaijan, or related conflicts',
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
    ya: 'Yasuke',
  };

  function sendAlert(user, template, topic) {
    let newWikitext;
    let editSummary;

    switch (template) {
      case 'intro':
        newWikitext = `\n\n{{subst:alert/first|${topic}}} ~~~~`;
        editSummary = `Introduction to [[WP:CT|contentious topics]]: ${topic}) ([[User:CanonNi/Scripts/AlertAssistant|AA]]`;
        break;
      case 'alert':
        newWikitext = `\n\n==Contentious topic alert==\n{{subst:alert|${topic}}} ~~~~`;
        editSummary = `[[WP:CT|Contentious topic]] alert: ${topic}) ([[User:CanonNi/Scripts/AlertAssistant|AA]]`;
        break;
      default:
        newWikitext = `{{error|AlertAssistant error! Please revert edit and report bug.}}`;
        editSummary = `AlertAssistant error! Please revert edit and report bug.`;
        break;
    }

    return new mw.Api().edit(`User talk:${user}`, (revision) => {
      return {
        text: revision.content + newWikitext,
        summary: editSummary,
      };
    });
  }
  class MainDialog extends OO.ui.ProcessDialog {
    constructor(config) {
      super(config);
    }

    static get static() {
      return {
        name: 'mainDialog',
        title: 'AlertAssistant',
        actions: [
          {
            flags: ['primary', 'progressive'],
            label: 'Send',
            action: 'send',
          },
          {
            flags: 'safe',
            icon: 'close',
            label: 'Cancel',
            invisibleLabel: true,
          },
        ],
      };
    }

    initialize() {
      super.initialize();

      this.panel = new OO.ui.PanelLayout({
        padded: true,
        expanded: false,
      });
      this.fieldset = new OO.ui.FieldsetLayout({
        label: 'Customize alert',
      });

      this.topicsDropdown = new OO.ui.DropdownWidget({
        label: 'Active topics',
        menu: {
          items: Object.keys(topicList).map((key) => {
            return new OO.ui.MenuOptionWidget({
              data: key,
              label: topicList[key],
            });
          }),
        },
      });

      this.selectorButtons = new OO.ui.ButtonSelectWidget({
        items: [
          new OO.ui.ButtonOptionWidget({
            data: 'intro',
            icon: 'lightbulb',
            label: 'Intro',
          }),
          new OO.ui.ButtonOptionWidget({
            data: 'alert',
            icon: 'infoFilled',
            label: 'Alert',
          }),

          // will implement in the future
          /* new OO.ui.ButtonOptionWidget({
                        data: 'sanction',
                        icon: 'error',
                        label: 'Sanctions',
                    }), */
        ],
      });

      this.filterNotice = new OO.ui.MessageWidget({
        type: 'notice',
        icon: 'funnel',
        label: new OO.ui.HtmlSnippet(
          '<strong>Note:</strong>Due to <a href="https://en.wikipedia.org/wiki/Special:AbuseFilter/602">filter 602</a>, the script will not close automatically.<br>Please reload the page after clicking send.'
        ),
      });

      this.fieldset.addItems([
        new OO.ui.FieldLayout(this.topicsDropdown),
        new OO.ui.FieldLayout(this.selectorButtons),
        new OO.ui.FieldLayout(this.filterNotice),
      ]);
      this.panel.$element.append(this.fieldset.$element);
      this.$body.append(this.panel.$element);
    }

    getSetupProcess(data = {}) {
      return super.getSetupProcess(data).next(() => {});
    }

    getActionProcess(action) {
      if (action === 'send') {
        const username = mw.config.get('wgTitle');
        const selectedTopic = this.topicsDropdown.getMenu().findSelectedItem().getData();
        const selectorMenu = this.selectorButtons.findSelectedItem().getData();

        return new OO.ui.Process(() => {
          sendAlert(username, selectorMenu, selectedTopic).then(() => {
            sendAlert(username, selectorMenu, selectedTopic)
              .then(() => {
                console.log('successfully sent alert');
                location.reload();
              })
              .catch((err) => {
                console.error('error sending alert: ', err);
                OO.ui.alert('Failed to send alert! Check console for errors and retry.');
              });
          });
        });
      }

      return super.getActionProcess(action);
    }

    getTeardownProcess(data) {
      return super.getTeardownProcess(data).first(() => {});
    }
  }

  if (mw.config.get('wgNamespaceNumber') === 3) {
    mw.util.addPortletLink(
      'p-cactions',
      '#',
      'AlertAssistant',
      'ca-aa',
      'Alert about contentious topics'
    );
    $('#ca-aa').on('click', (event) => {
      event.preventDefault();

      const windowManager = new OO.ui.WindowManager();
      $(document.body).append(windowManager.$element);

      const mainDialog = new MainDialog();
      windowManager.addWindows([mainDialog]);
      windowManager.openWindow(mainDialog);
    });
  }
});

// </nowiki>
