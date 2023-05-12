const app = require('./src/server');
const { db } = require('./src/db');
const { loadDb } = require('./src/db')

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  db.sync({ force: false}).then(() => { 
    console.log('Modelos sincronizados');
  })
});
