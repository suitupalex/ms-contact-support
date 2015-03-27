var assert = require('assert');
var conversationBuilder = require('../src/conversation-builder');

describe('ms-contact-support', function() {
  describe('conversation builder', function() {
    it('should build correct JSON with no attachment', function() {
      var expected = {
        type: 'email',
        customer: {
          email: 'customer@example.com',
          firstName: 'Joey',
          lastName: 'Customer',
          type: 'customer'
        },
        subject: 'Help!',
        tags: [
          'Bug Fix'
        ],
        threads: [{
          type: 'customer',
          createdBy: {
            email: 'customer@example.com',
            firstName: 'Joey',
            lastName: 'Customer',
            type: 'customer'
          },
          body: 'I broke everything.'
        }]
      };

      var actual = conversationBuilder({
        email: 'customer@example.com',
          name: 'Joey Customer',
          subject: 'Help!',
          body: 'I broke everything.',
          tags: ['Bug Fix']
      });

      assert.deepEqual(actual, expected, 'Conversations don\'t match!');
    });

    it('should build correct JSON with an attachment', function() {
      var expected = {
        type: 'email',
        customer: {
          email: 'customer@example.com',
          firstName: 'Joey',
          lastName: 'Customer',
          type: 'customer'
        },
        subject: 'Help!',
        tags: [
          'Bug Fix'
        ],
        threads: [{
          type: 'customer',
          createdBy: {
            email: 'customer@example.com',
            firstName: 'Joey',
            lastName: 'Customer',
            type: 'customer'
          },
          body: 'I broke everything.',
          attachments: [{
            hash: 'test'
          }]
        }]
      };

      var actual = conversationBuilder({
        email: 'customer@example.com',
          name: 'Joey Customer',
          subject: 'Help!',
          body: 'I broke everything.',
          tags: ['Bug Fix'],
          attachment: 'test'
      });

      assert.deepEqual(actual, expected, 'Conversations don\'t match!');
    });
  });
});
