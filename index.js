const express = require('express');
const app = express();

// Routing
app.use('/', require('./server/routes/routes'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
