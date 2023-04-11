const bcrypt = require('bcrypt');

const password = '123';
// const hashPassword = function hashPassword(){ bcrypt.hash(password, 10, async (err, hash) => {
//     return hash
// })};

const hash = bcrypt.hashSync(password, 10);
console.log('hashPassword: ', hash);