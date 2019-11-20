'use strict';

const mode = process.env.OUTPUT_MODE || 'stdout'

const Spider = require('dhtspider');

const bootstraps = [{
    address: 'router.bittorrent.com',
    port: 6881
}, {
    address: 'dht.transmissionbt.com',
    port: 6881
},{
    address: 'router.utorrent.com',
    port: 6881
},{
    address: 'router.bitcomet.com',
    port: 6881
},{
    address: 'dht.aelitis.com',
    port: 6881
},{
    address: 'router.bittorrent.com',
    port: 6881
}];

if (mode =='sqlite') {
  const db = require('better-sqlite3')('dht-spider.db')
  db.exec(`CREATE TABLE IF NOT EXISTS hashes(
      hash TEXT PRIMARY KEY, 
      time DATETIME DEFAULT CURRENT_TIMESTAMP
  );`);
}

function add(data) {
  if (mode == 'sqlite'){
    const stmt = db.prepare('INSERT OR REPLACE INTO hashes (hash) VALUES (?)');
    const result = stmt.run(data);
  } else {
    console.log(data);
  }
}

const spider = new Spider({'bootstraps': bootstraps});

spider.on('ensureHash', (hash, addr) => add(hash.toLowerCase()));

spider.listen(parseInt(process.env.SPIDER_PORT) || 6339);


