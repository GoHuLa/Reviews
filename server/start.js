const app = require('./index.js');

app.listen(process.env.PORT || 3000);
console.log(`listening on ${process.env.PORT || 3000}`);
