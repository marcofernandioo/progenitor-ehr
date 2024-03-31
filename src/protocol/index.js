import getPort from "get-port";
// const getPort = require('get-port');


export default class Protocol {
    static portList = [3000, 3001, 3002, 3003, 3004];
 
    static async startServerOnAvailablePort (app) {
        const port = await getPort({ port: this.portList});
        app.listen(port, () => {
            console.log("App running on port", port);
        })
    }
    
    static propagateBlockchainData() {

    }

}