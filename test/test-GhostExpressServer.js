const Promise = require('bluebird');
const Chai = require('chai');
const expect = Chai.expect;
const express = require('express');
const Config = require('config');
const GhostExpressServer = require('../lib/GhostExpressServer');
const GhostExpressServerFactory = require('../index');

const ghostServer = GhostExpressServerFactory.create(Config.get('server'));

describe('GhostExpressServer', function () {

    describe('Angular4', () => {

        it('should load an angular 4 universal application', () => {

        });

    });

    describe('useMiddleware', () => {});
    describe('useRouter', () => {});
    describe('useSequelizeService', () => {});

});