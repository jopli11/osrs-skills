import { EquipmentPiece } from '@/types/dps/Player';
// Import raw equipment data directly from the CDN
import rawEquipment from '../../../cdn/json/equipment.json';

// CDN image helper function (copied from osrs-dps-calc)
const getCdnImage = (filename: string) => `https://tools.runescape.wiki/osrs-dps/cdn/${filename}`;

// Transform equipment data to include proper image URLs and remove duplicates
const processedEquipment = (rawEquipment as any[]).map((item): EquipmentPiece => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
  ...item,
  // Add proper image URL using the osrs-dps-calc CDN
  image: item.image ? getCdnImage(`equipment/${item.image}`) : undefined,
}));

// Remove duplicate equipment by ID, keeping the first occurrence
const seenIds = new Set<number>();
export const EQUIPMENT_DATABASE: EquipmentPiece[] = processedEquipment.filter(item => {
  if (seenIds.has(item.id)) {
    console.warn(`Duplicate equipment ID found: ${item.id} (${item.name}) - removing duplicate`);
    return false;
  }
  seenIds.add(item.id);
  return true;
});

// Helper functions
export const getEquipmentBySlot = (slot: string): EquipmentPiece[] => {
  return EQUIPMENT_DATABASE.filter(item => item.slot === slot);
};

export const getEquipmentById = (id: number): EquipmentPiece | undefined => {
  return EQUIPMENT_DATABASE.find(item => item.id === id);
};

export const getWeapons = (): EquipmentPiece[] => {
  return EQUIPMENT_DATABASE.filter(item => item.slot === 'weapon');
};

export const getArmor = (): EquipmentPiece[] => {
  return EQUIPMENT_DATABASE.filter(item => item.slot !== 'weapon');
};

// Equipment slot configuration
export const EQUIPMENT_SLOTS = [
  { key: 'head', name: 'Head', gridPosition: { row: 1, col: 2 } },
  { key: 'cape', name: 'Cape', gridPosition: { row: 2, col: 1 } },
  { key: 'neck', name: 'Neck', gridPosition: { row: 2, col: 2 } },
  { key: 'ammo', name: 'Ammo', gridPosition: { row: 2, col: 3 } },
  { key: 'weapon', name: 'Weapon', gridPosition: { row: 3, col: 1 } },
  { key: 'body', name: 'Body', gridPosition: { row: 3, col: 2 } },
  { key: 'shield', name: 'Shield', gridPosition: { row: 3, col: 3 } },
  { key: 'legs', name: 'Legs', gridPosition: { row: 4, col: 2 } },
  { key: 'hands', name: 'Hands', gridPosition: { row: 5, col: 1 } },
  { key: 'feet', name: 'Feet', gridPosition: { row: 5, col: 2 } },
  { key: 'ring', name: 'Ring', gridPosition: { row: 5, col: 3 } },
] as const;

export type EquipmentSlotKey = typeof EQUIPMENT_SLOTS[number]['key'];

// Legacy export for backward compatibility
export const BASIC_EQUIPMENT = EQUIPMENT_DATABASE; 