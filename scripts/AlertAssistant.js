$(function (){
    //Check if the config is defined
    if (typeof(alertAssistantConfig) == 'undefined') {
      alertAssistantConfig = {};
    }
   
    if (typeof(alertAssistantConfig.topicList) == 'undefined') {
        alertAssistantConfig.topicList = {
        	'a-a' : [ 'Armenia, Azerbaijan, or related conflicts' ],
        	'a-i' : [ 'the Arab–Israeli conflict' ],
        	'ab'  : [ 'abortion' ],
        	'acu' : [ 'complementary and alternative medicine' ],
        	'ap'  : [ 'post-1992 politics of the United States and closely related people' ],
        	'at'  : [ 'the English Wikipedia article titles policy and Manual of Style' ],
        	'b'   : [ 'the Balkans or Eastern Europe '],
        	'blp' : [ 'articles about living or recently deceased people, and edits relating to the subject (living or recently deceased) of such biographical articles' ],
        	'cc'  : [ 'climate change' ],
        	'cid' : [' discussions about infoboxes and to edits adding, deleting, collapsing, or removing verifiable information from infoboxes' ],
        	'covid':[ 'COVID-19, broadly construed' ],
        	'fg'  : [ 'Falun Gong' ],
        	'gc'  : [ 'governmental regulation of firearm ownership; the social, historical and political context of such regulation; and the people and organizations associated with these issues' ],
        	'gg'  : [ 'gender-related disputes or controversies or people associated with them' ],
        	'gmo' : [ 'genetically modified organisms, commercially produced agricultural chemicals and the companies that produce them, broadly construed' ],
        	'horn' :[ 'the Horn of Africa (defined as including Ethiopia, Somalia, Eritrea, Djibouti, and adjoining areas if involved in related disputes)' ],
        	'ipa' : [ 'India, Pakistan, and Afghanistan' ],
        	'irp' : [ 'post-1978 Iranian politics' ],
        	'kurd' :[ 'the topics of Kurds and Kurdistan, broadly construed' ],
        	'ps'  : [ 'pseudoscience and fringe science' ],
        	'r-i' : [ 'the intersection of race/ethnicity and human abilities and behaviour' ],
        	'sl'  : [ 'Sri Lanka' ],
        	'tt'  : [ 'The Troubles' ]
        };
    }
    
    if (mw.config.get('wgNamespaceNumber') === 3 | mw.config.get('wgPageName') === 'User:CanonNi/sandbox2') {
	    mw.util.addPortletLink(
	        'p-cactions', //target tab - personal links
	        '#', //link URL
	        'CT Alert', //link text
	        'pt-alert', //id of new button
	        'Alert about contentious topics', //hover text
	    );
    }
   
    $('#pt-alert').click(function (){
        var Window = new Morebits.simpleWindow(600, 500);
        Window.setTitle('Alert about contentious topics');
        Window.setScriptName('AlertAssistant');
        Window.display();
        var form = new Morebits.quickForm(publish);
        form.append({
            type: 'radio',
            name: 'first',
            list: [
                { label: 'First', value: 'true' },
                { label: 'Regular', value: 'false' }
            ]
        });
        var categories = form.append({
            type: 'select',
            name: 'topic',
            label: 'Select topic:'
        });
        for (var key in alertAssistantConfig.topicList) {
    		if (alertAssistantConfig.topicList.hasOwnProperty(key)) {
				categories.append({
            		type: 'option',
            		label: alertAssistantConfig.topicList[key][0],
            		value: key
        		});
    		}
		}
        form.append({ type: 'submit' });
        var result = form.render();
        Window.setContent(result);
        Window.display();

        function publish(e){
            var form = e.target;
            var topic = form.topic.value;
            var first = form.first.value === 'true';
            
            Morebits.simpleWindow.setButtonsEnabled(false);
            Morebits.status.init(form);
			Morebits.wiki.actionCompleted.notice = 'Alerted!';
            
            var alertPage = new Morebits.wiki.page(mw.config.get('wgPageName'), 'Processing');
            alertPage.setFollowRedirect(true);
            alertPage.load(function() {
                var text = alertPage.getPageText();
                if (first) {
                	text += '\n\n' + '{{subst:alert/first|' + topic + '}} ~~~~';
                } else {
                	text += '\n\n' + '== Contentious topic alert == \n' + '{{subst:alert|' + topic + '}} ~~~~';
                }
                alertPage.setEditSummary('Contentious topic alert: ' + topic + ' (using [[User:CanonNi/Scripts/AlertAssistant|AlertAssistant]])');
                alertPage.setPageText(text);
                alertPage.save();
            });
        }
    });
});
