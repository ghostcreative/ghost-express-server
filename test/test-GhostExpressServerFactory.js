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

  describe('start', () => {

  });

  describe('useMiddleware', () => {

  });

  describe('useRouter', () => {

  });


});