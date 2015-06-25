//  This routine allows for a quick call to the helpscout API to list the mailboxes that are available
//  This is necessary in order to retrieve the ID of a mailbox to which we want to sent content via
//  the API.  This isn't used in the running, but the IDs are used in the service.

var Helpscout = require('helpscout');
var helpscout = new Helpscout(process.env.HELP_SCOUT_API_KEY);
helpscout.mailboxes.list( function (err, mailboxes) {
    console.log(mailboxes);
});

