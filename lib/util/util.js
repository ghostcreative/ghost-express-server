module.exports = {

  listAllEndpoints: (endpoints) => {
    const CliTable = require('cli-table');
    const table = new CliTable({ head: ["", "Name", "Path"] });
    console.info('\n********************************************');
    console.info('\t\tSERVER ENDPOINTS');
    console.info('********************************************\n');
    for (let key in endpoints) {
      if (endpoints.hasOwnProperty(key) && endpoints[key].route) {
        let _obj = {};
        _obj[endpoints[key].route.stack[0].method] = [endpoints[key].route.path, endpoints[key].route.path];
        table.push(_obj);
      }
    }
    console.info(table.toString());
    return table;
  }

};