'use strict';

const ServiceLocator = require('./serviceLocator');

let serviceLocator = null;

const ServiceLocatorFactory = {

  /**
   * @param {Config} [nodeConfig]
   * @returns {ServiceLocator}
   */
  getServiceLocatorSingleton: (nodeConfig) => {
    if (!serviceLocator) {
      serviceLocator = new ServiceLocator(nodeConfig);
    }
    return serviceLocator;
  }

};

module.exports = ServiceLocatorFactory;