declare module 'get-port' {
    export default function getPort(options?: { port?: number | number[] }): Promise<number>;
}

declare class Protocol {
    static portList: number[];
    static startServerOnAvailablePort(app: any): Promise<void>;
    static propagateBlockchainData(): void;
}

export default Protocol;