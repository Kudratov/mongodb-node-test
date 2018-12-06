/*jshint esversion: 6 */
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var message = 'This is user id number 4';
// var hashedVal = SHA256(message).toString();

// console.log(`Message is ${message}`);
// console.log(`Hashed value is ${hashedVal}`);

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'abc123');

// console.log('-------');
// console.log(token);
// console.log('-------');

// var decode = jwt.verify(token, 'abc123');

// console.log('++++++++');
// console.log(decode);
// console.log('++++++++');


var password = 'abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });
var hashedPassword = '$2a$10$kehzfCgj32FGOJupgrGvQ.XJ0yDTiRZvM6a36KwHGLqa4VbDAhRfG';

bcrypt.compare(`${password}`, hashedPassword, (err, res) => {
    console.log(res);
});