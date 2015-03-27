require('assert-dotenv')({}, function() {
  'use strict';

  var Promise = require('bluebird');

  var HelpEsb = require('help-esb');
  var esbClient = new HelpEsb.Client(process.env.ESB, {
    debug: process.env.DEBUG === 'true'
  });
  esbClient.login('contact-support');

  var FemSender = require('help-esb-send-to-fem');
  var femSender = new FemSender(esbClient);

  var CommandManager = require('help-fem-command-manager');
  var commandManager = new CommandManager(esbClient);
  commandManager.addCommand(
    'client session event',
    ['user', 'manager'],
    'contact support'
  );

  var helpscout = require('./src/help-scout')(process.env.HELP_SCOUT_API_KEY);

  esbClient.subscribe('contact support');
  esbClient.on('group.contact support', function(message) {
    helpscout({
      email: message.get('data.email'),
      name: message.get('data.name'),
      subject: message.get('data.subject'),
      body: message.get('data.body'),
      tags: message.get('data.tags', null),
      attachment: message.get('data.attachment', null)
    })
      .then(function(response) {
        femSender.sendSession(
          response,
          message.getMeta('clientId'),
          message.get('meta.id'),
          'contact support result',
          'SUCCESS',
          null,
          message
        );
      })
      .catch(function(error) {
        femSender.sendSession(
          error,
          message.getMeta('clientId'),
          message.get('meta.id'),
          'contact support result',
          'FAILURE',
          null,
          message
        );
      });
  });

  esbClient.on('error', console.error);
});
