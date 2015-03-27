/**
 * Helpscout convenience module which extends JSON for the Helpscout API
 *
 */

module.exports = function(apiKey) {
  'use strict';

  var Helpscout = require('helpscout');
  var Promise = require('bluebird');
  var buildConversation = require('./conversation-builder');

  var helpscout = Helpscout(apiKey);
  var mailbox = Helpscout(apiKey, process.env.MAILBOX_ID);
  var createAttachment = Promise.promisify(
    helpscout.attachments.create.bind(helpscout.attachments));
  var createConversation = Promise.promisify(
    mailbox.conversations.create.bind(mailbox.conversations));
  return function(message) {
    var futureAttachment = (message.attachment) ? 
      createAttachment(message.attachment) :
      Promise.resolve();

    return futureAttachment.then(function(attachment) {
      message.attachment = attachment;
      return createConversation(buildConversation(message));
    });
  }
}
