import { Player } from '@/types/dps/Player';
import { Monster } from '@/types/dps/Monster';
import { DPSCalculationResult } from '@/lib/dps/calculations';
import { DPSWorkerRequest, DPSWorkerResponse } from '@/workers/dpsWorker';

export class DPSWorkerClient {
  private worker: Worker | null = null;
  private pendingRequests = new Map<string, {
    resolve: (result: DPSCalculationResult) => void;
    reject: (error: Error) => void;
  }>();

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    if (typeof window !== 'undefined') {
      try {
        this.worker = new Worker(new URL('@/workers/dpsWorker.ts', import.meta.url));
        this.worker.onmessage = this.handleWorkerMessage.bind(this);
        this.worker.onerror = this.handleWorkerError.bind(this);
      } catch (error) {
        console.warn('Failed to create DPS worker, falling back to main thread:', error);
      }
    }
  }

  private handleWorkerMessage(e: MessageEvent<DPSWorkerResponse>) {
    const { id, data, error } = e.data;
    const request = this.pendingRequests.get(id);
    
    if (request) {
      this.pendingRequests.delete(id);
      
      if (error) {
        request.reject(new Error(error));
      } else {
        request.resolve(data);
      }
    }
  }

  private handleWorkerError(error: ErrorEvent) {
    console.error('DPS Worker error:', error);
    // Reject all pending requests
    for (const [id, request] of this.pendingRequests) {
      request.reject(new Error('Worker error'));
      this.pendingRequests.delete(id);
    }
  }

  public async calculateDPS(player: Player, monster: Monster): Promise<DPSCalculationResult> {
    // Fallback to main thread if worker is not available
    if (!this.worker) {
      const { calculateDPS } = await import('@/lib/dps/calculations');
      return calculateDPS(player, monster);
    }

    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      
      this.pendingRequests.set(id, { resolve, reject });
      
      const request: DPSWorkerRequest = {
        type: 'CALCULATE_DPS',
        data: { player, monster },
        id,
      };
      
      this.worker!.postMessage(request);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('DPS calculation timeout'));
        }
      }, 5000);
    });
  }

  public terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingRequests.clear();
  }
}

// Export a singleton instance
export const dpsWorkerClient = new DPSWorkerClient(); 