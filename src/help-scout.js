/**
 * Helpscout convenience module which extends JSON for the Helpscout API
 *
 */

module.exports = function(apiKey) {
  'use strict';

  var Helpscout = require('helpscout');
  var Promise = require('bluebird');
  var buildConversation = require('./conversation-builder');

  var helpscout = new Helpscout(apiKey);
  var mailbox = new Helpscout(apiKey, process.env.HELP_SCOUT_MAILBOX_ID);
  var urgentMailbox = new Helpscout(
    apiKey,
    process.env.HELP_SCOUT_URGENT_MAILBOX_ID
  );

  var createAttachment = Promise.promisify(
    helpscout.attachments.create.bind(helpscout.attachments));
  var createConversation = Promise.promisify(
    mailbox.conversations.create.bind(mailbox.conversations));
  var createUrgentConversation = Promise.promisify(
    urgentMailbox.conversations.create.bind(urgentMailbox.conversations));
  return function(message) {
    var futureAttachment = (message.attachment) ?
      createAttachment(message.attachment) :
      Promise.resolve();

    return futureAttachment.then(function(attachment) {
      if (attachment) {
        message.attachment = attachment.item.hash;
      }
      if (isUrgent(message)) {
        return createUrgentConversation(buildConversation(message));
      } else {
        return createConversation(buildConversation(message));
      }
    });
  };

  function isUrgent(message) {
    return message.tags.indexOf('urgent') >= 0;
  }
};
