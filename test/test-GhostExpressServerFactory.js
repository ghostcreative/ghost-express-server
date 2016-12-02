const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');
const GhostExpressServer = require('../lib/GhostExpressServer');
const GhostExpressServerFactory = require('../index');

describe('GhostExpressServerFactory', function () {

  describe('create', () => {

    it('should create a server from config', () => {
      return GhostExpressServerFactory.create(Config.get('server'))
      .then(server => {
        expect(server).to.exist;
        expect(server).to.be.instanceOf(GhostExpressServer)
      })
    });

  });

  describe('run', () => {

    it('should start & stop', () => {
      let server;
      return GhostExpressServerFactory.create(Config.get('server'))
      .then(_server_ => server = _server_)
      .then(() => server.start())
      .then(() => server.stop())
    })
  });

  describe('useMiddleware', () => {

  });

  describe('useRouter', () => {

  });


});