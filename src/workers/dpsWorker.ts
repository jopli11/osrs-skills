import { Player } from '@/types/dps/Player';
import { Monster } from '@/types/dps/Monster';
import { calculateDPS, DPSCalculationResult } from '@/lib/dps/calculations';

export interface DPSWorkerRequest {
  type: 'CALCULATE_DPS';
  data: {
    player: Player;
    monster: Monster;
  };
  id: string;
}

export interface DPSWorkerResponse {
  type: 'CALCULATE_DPS_RESULT';
  data: DPSCalculationResult;
  id: string;
  error?: string;
}

// Worker message handler
self.onmessage = function(e: MessageEvent<DPSWorkerRequest>) {
  const { type, data, id } = e.data;
  
  try {
    if (type === 'CALCULATE_DPS') {
      const result = calculateDPS(data.player, data.monster);
      
      const response: DPSWorkerResponse = {
        type: 'CALCULATE_DPS_RESULT',
        data: result,
        id,
      };
      
      self.postMessage(response);
    }
  } catch (error) {
    const errorResponse: DPSWorkerResponse = {
      type: 'CALCULATE_DPS_RESULT',
      data: {
        maxHit: 0,
        accuracy: 0,
        dps: 0,
        ttk: undefined,
        attackRoll: 0,
        defenceRoll: 0,
      },
      id,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    self.postMessage(errorResponse);
  }
}; 