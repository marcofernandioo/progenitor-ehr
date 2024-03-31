// protocol.d.ts

// Likely using ES modules based on "import" statement
import getPort from 'get-port';

export default class Protocol {
  static readonly portList: number[]; // Use readonly to indicate fixed values

  static startServerOnAvailablePort(app: any): Promise<void>; // Use Promise for async function

  static propagateBlockchainData(): void; // No return type for void functions
}
