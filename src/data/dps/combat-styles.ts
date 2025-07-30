import { EquipmentCategory, PlayerCombatStyle } from '@/types/dps/Player';

// Combat styles for different weapon categories - ported from osrs-dps-calc
export const getCombatStylesForCategory = (category: EquipmentCategory): PlayerCombatStyle[] => {
  switch (category) {
    case EquipmentCategory.SCYTHE:
      return [
        { name: 'Reap', type: 'slash', stance: 'Accurate' },
        { name: 'Chop', type: 'slash', stance: 'Aggressive' },
        { name: 'Jab', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.TWO_HANDED_SWORD:
      return [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Smash', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.WHIP:
      return [
        { name: 'Flick', type: 'slash', stance: 'Accurate' },
        { name: 'Lash', type: 'slash', stance: 'Controlled' },
        { name: 'Deflect', type: 'slash', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.DAGGER:
    case EquipmentCategory.STAB_SWORD:
      return [
        { name: 'Stab', type: 'stab', stance: 'Accurate' },
        { name: 'Lunge', type: 'stab', stance: 'Aggressive' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Block', type: 'stab', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.SLASH_SWORD:
      return [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Slash', type: 'slash', stance: 'Aggressive' },
        { name: 'Lunge', type: 'stab', stance: 'Controlled' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.BLUNT:
      return [
        { name: 'Pound', type: 'crush', stance: 'Accurate' },
        { name: 'Pummel', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'crush', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.AXE:
      return [
        { name: 'Chop', type: 'slash', stance: 'Accurate' },
        { name: 'Hack', type: 'slash', stance: 'Aggressive' },
        { name: 'Smash', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'slash', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.SPEAR:
    case EquipmentCategory.POLEARM:
      return [
        { name: 'Jab', type: 'stab', stance: 'Controlled' },
        { name: 'Swipe', type: 'slash', stance: 'Aggressive' },
        { name: 'Fend', type: 'stab', stance: 'Defensive' },
      ];
    
    case EquipmentCategory.BOW:
    case EquipmentCategory.CROSSBOW:
    case EquipmentCategory.THROWN:
      return [
        { name: 'Accurate', type: 'ranged', stance: 'Accurate' },
        { name: 'Rapid', type: 'ranged', stance: 'Rapid' },
        { name: 'Longrange', type: 'ranged', stance: 'Longrange' },
      ];
    
    case EquipmentCategory.STAFF:
    case EquipmentCategory.POWERED_STAFF:
      return [
        { name: 'Bash', type: 'crush', stance: 'Accurate' },
        { name: 'Pound', type: 'crush', stance: 'Aggressive' },
        { name: 'Focus', type: 'crush', stance: 'Defensive' },
        { name: 'Spell', type: 'magic', stance: 'Autocast' },
        { name: 'Spell', type: 'magic', stance: 'Manual Cast' },
      ];
    
    case EquipmentCategory.UNARMED:
    default:
      return [
        { name: 'Punch', type: 'crush', stance: 'Accurate' },
        { name: 'Kick', type: 'crush', stance: 'Aggressive' },
        { name: 'Block', type: 'crush', stance: 'Defensive' },
      ];
  }
};

// Get weapon category from equipment name (simplified mapping)
export const getWeaponCategory = (weaponName: string | null): EquipmentCategory => {
  if (!weaponName) return EquipmentCategory.UNARMED;
  
  const name = weaponName.toLowerCase();
  
  if (name.includes('scythe')) return EquipmentCategory.SCYTHE;
  if (name.includes('whip')) return EquipmentCategory.WHIP;
  if (name.includes('dagger')) return EquipmentCategory.DAGGER;
  if (name.includes('sword') && (name.includes('2h') || name.includes('two'))) return EquipmentCategory.TWO_HANDED_SWORD;
  if (name.includes('sword')) return EquipmentCategory.SLASH_SWORD; // Default to slash sword
  if (name.includes('mace') || name.includes('hammer')) return EquipmentCategory.BLUNT;
  if (name.includes('axe')) return EquipmentCategory.AXE;
  if (name.includes('spear')) return EquipmentCategory.SPEAR;
  if (name.includes('staff')) return EquipmentCategory.STAFF;
  if (name.includes('bow')) return EquipmentCategory.BOW;
  if (name.includes('crossbow')) return EquipmentCategory.CROSSBOW;
  
  return EquipmentCategory.SLASH_SWORD; // Default fallback
};