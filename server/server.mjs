import * as alt from 'alt-server';
import * as sm from 'simplymongo';

const db = sm.getDatabase();


alt.on('playerConnect', (player) => {
  alt.emitClient(player, 'client::auth:init');
});


let authdb;

const accountsCollection = db.db.collection('users');


async function accountCreation(login, email, pass, ip, player) {

  const user = await accountsCollection.findOne({ 
    $or: [{username: login}, {mail: email}, {playerip: ip}] 
  });

  if (user) {
    alt.emitClient(player, 'accRegsistered');
    return;
  }


    // Create new account. Return document.
    authdb = {};
    authdb.data = await accountsCollection.insertOne({ username: login, mail: email, password: pass, playerip: ip, money: 20000 });
    // Update all parameters.
    await accountsCollection.updateOne({ _id: authdb.data._id }, { $set: { ...authdb.data } });
    // Fetch by ID
    alt.emitClient(player, 'client::auth:close');

    // teleport

    const spawnPos = { x: 14.9011, y: 6425.1826, z: 31.3861}; 

    player.pos = spawnPos;
}


alt.onClient('server:auth:registration', (player, data) => {
  const { login, pass, email } = data;
  const ip = player.ip;
  accountCreation(login, email, pass, ip, player);
});



async function accountLogin(login, pass, player) {

  // Find user that matches both username and password
  const valid = await accountsCollection.findOne({
    username: login,
    password: pass 
  });

  if (valid) {
    alt.emitClient(player, 'client::auth:close');
  } else {
    alt.emitClient(player, 'accNotValidLogin');
    return;
  }

}

alt.onClient('server:auth:authorization', (player, data) => {

  const { login, pass } = data;

  accountLogin(login, pass, player);
});

