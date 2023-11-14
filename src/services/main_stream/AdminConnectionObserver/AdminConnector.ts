import { server } from "typescript";
import {v4 as uuid} from "uuid";

class AdminConnectionObserver {
  private static instance: AdminConnectionObserver;
  private connectionToken: string | null = null;

  public constructor() {
    if (AdminConnectionObserver.instance) {
      return AdminConnectionObserver.instance;
    }
    
    AdminConnectionObserver.instance = this;
    return AdminConnectionObserver.instance;
  }

  public getConnectionStatus(): boolean {
    return !!this.connectionToken;
  }

  public markConnectionEstablished(): string {
    const token = uuid();
    this.connectionToken = token;
    return token;
  }

  public markConnectionTerminated() {
    this.connectionToken = null;
  }
}

export default AdminConnectionObserver;
