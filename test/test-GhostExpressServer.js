const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const express = require('express');
const Config = require('config');
const GhostExpressServer = require('../lib/GhostExpressServer');
const GhostExpressServerFactory = require('../index');

const ghostServer = GhostExpressServerFactory.create(Config.get('server'));

describe('GhostExpressServerFactory', function () {

    describe('start', () => {});
    describe('stop', () => {});
    describe('useMiddleware', () => {});
    describe('useRouter', () => {});
    describe('useSequelizeService', () => {});

});