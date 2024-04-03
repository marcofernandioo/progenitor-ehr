import * as portfinder from 'portfinder'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class Protocol {

    static nodePort: number = 0;

    // Start the node server on an available port from 300 to port 3004
    static startServerOnAvailablePort(app: any, cb: any) {
        portfinder.getPortPromise({ port: 8000, stopPort: 8004 })
            .then((port) => {
                this.nodePort = port;
                app.listen(port, cb(port))
            })
            .catch((err) => {
                console.log("Error,", err);
            })
    }

    // Send a request to all the nodes in the blockchain except itself.
    static async propagateRequest(method: 'GET' | 'POST', endpoint: string, data?: any) {
        const options = { port: 3000, stopPort: 3004 };
        const availablePorts: number[] = [];

        for (let currentPort = options.port; currentPort <= options.stopPort; currentPort++) {
            try {
                const isPortAvailable = await portfinder.getPortPromise({ port: currentPort });
                if (isPortAvailable) {
                    availablePorts.push(currentPort);
                }
            } catch (error) {
                console.error(`Error checking port ${currentPort}: ${error}`);
            }
        }

        for (const availablePort of availablePorts) {
            if (availablePort !== this.nodePort) {
                try {
                    const url = `http://localhost:${availablePort}${endpoint}`;
                    const config: AxiosRequestConfig = {
                        method,
                        url,
                        data
                    };
                    const response: AxiosResponse = await axios(config);
                    console.log(`Response from ${url}: ${JSON.stringify(response.data)}`);
                } catch (error) {
                    console.error(`Error sending request to ${availablePort} ${endpoint}: ${error}`);
                }
            }
        }


    }

}

