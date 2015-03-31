/**
 * Convenience method for extending an object to a full Helpscout conversation.
 *
 * @param {Object} options
 *  @param {String} email
 *  @param {String} name
 *  @param {String} subject
 *  @param {String} body
 *  @param {Array[String]} tags
 *  @param {String} attachment (hash)
 */

module.exports = function(options) {
  'use strict';
  var names = options.name.split(' ');
  var firstName = names.shift();
  var lastName = names.join(' ');

  var conversation = {
    type: 'email',
    customer: {
      email: options.email,
      firstName: firstName,
      lastName: lastName,
      type: 'customer'
    },
    subject: options.subject,
    tags: options.tags,
    threads: [{
      type: 'customer',
      createdBy: {
        email: options.email,
        firstName: firstName,
        lastName: lastName,
        type: 'customer'
      },
      body: options.body
    }]
  };

  if (options.attachment) {
    conversation.threads[0].attachments = [{
      hash: options.attachment
    }];
  }

  return conversation;
};
