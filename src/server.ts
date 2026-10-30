import {app} from './app.js';
const port=Number(process.env.PORT??3000);
const server=app.listen(port,()=>console.log(`BFF listening on http://localhost:${port}`));
function shutdown(){server.close(()=>process.exit(0));}
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
