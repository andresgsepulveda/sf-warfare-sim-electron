/* jshint esversion: 6 */
const attitudes =
{
  ALLIED : 'allied',
  FRIENDLY : 'friendly',
  NEUTRAL : 'neutral'
};

const sizes =
{
  SMALL : 4,
  MEDIUM : 6,
  LARGE : 8,
  HUGE : 10,
  COLOSSAL : 12
};

const unit_types =
{
  LEVIES : 'levies',
  INFANTRY : 'infantry',
  ARCHERS : 'archers',
  CAVALRY : 'cavalry',
  FLYING : 'flying',
  SIEGE_ENGINE : 'siege_engine'
};

const exp_types =
{
  NONE : 'none',
  GREEN : 'green',
  REGULAR : 'regular',
  SEASONED : 'seasoned',
  VETERAN : 'veteran',
  ELITE : 'elite',
  SUPER_ELITE : 'super_elite'
};

const unit_equips =
{
  NONE : 'none',
  LIGHT : 'light',
  MEDIUM : 'medium',
  HEAVY : 'heavy',
  SUPER_HEAVY : 'super_heavy'
};

class Unit_Trait
{

   constructor()
   {
      this.trait_name = "NONE";
      this.trait_description = "NONE";
      this.trait_cost = 0;
      this.next_trait = null;
   }

   get_name()
   {
     return this.name;
   }

   set_name(name)
   {
     if (typeof name === 'string'
         || name instanceof String)
     {
       this.name = name;
       return true;
     }
     return false;
   }

   get_description()
   {
     return this.description;
   }

   set_description(description)
   {
     if (typeof description === 'string'
         || description instanceof String)
     {
       this.description = description;
       return true;
     }
     return false;
   }

   get_cost()
   {
     return this.cost;
   }

   set_cost(cost)
   {
     if(Number.isInteger(cost) && 0 <= cost)
     {
       this.cost = cost;
       return true;
     }
     return false;
   }

   get_head_trait()
   {
     return this.next_trait;
   }

   set_head_trait(trait)
   {
     if(trait instanceof Unit_Trait)
     {
       this.next_trait = trait;
       return true;
     }
     return false;
   }
}

class Unit_Order
{

  constructor()
  {
    this.order_name = "NONE";
    this.order_description = "NONE";
    this.next_order = null;
  }

  get_name()
  {
    return this.order_name;
  }

  set_name(name)
  {
    if (typeof name === 'string'
        || name instanceof String)
    {
      this.order_name = name;
      return true;
    }
    return false;
  }

  get_description()
  {
    return this.description;
  }

  set_description(description)
  {
    if (typeof name === 'string'
        || name instanceof String)
    {
      this.order_description = description;
      return true;
    }
    return false;
  }

  get_head_order()
  {
    return this.next_order;
  }

  set_head_order(order)
  {
    if (order instanceof Unit_Order)
    {
      this.next_order = order;
      return true;
    }
    return false;
  }
}

class Unit_Attitude
{

  constructor()
  {
    this.attitude_status = attitudes.NEUTRAL;
    this.attitude_cost_mod = 1.50;
  }

  get_status()
  {
    return this.attitude_status;
  }

  set_status(attitude)
  {
     if (attitude in attitudes)
     {
       this.attitude_status = attitude;
       switch(attitude)
       {
         case attitudes.ALLIED:
          this.attitude_cost_mod = 1.0;
          break;
         case attitudes.FRIENDLY:
          this.attitude_cost_mod = 1.25;
          break;
         case attitudes.NEUTRAL:
          this.attitude_cost_mod = 1.50;
          break;
         default:
          break;
       }
       return true;
     }
     return false;
  }
}

class Unit_Size
{

   constructor()
   {
     this.size_status = sizes.SMALL;
     this.size_cost_mod = 0.66;
   }

   get_size_status()
   {
     return this.size_status;
   }

   set_size_status(size)
   {
     if (size in sizes)
     {
       this.size_status = size;
       switch(size)
       {
         case size.SMALL:
          this.size_cost_mod = 0.66;
          break;
         case size.MEDIUM:
          this.size_cost_mod = 1.0;
          break;
         case size.LARGE:
          this.size_cost_mod = 1.33;
          break;
         case size.HUGE:
          this.size_cost_mod = 1.66;
          break;
         case size.COLOSSAL:
          this.size_cost_mod = 2.0;
          break;
         default:
          break;
       }
       return true;
     }
     return false;
   }
}

class Unit_Type
{

  constructor()
  {
    this.type_status = unit_types.INFANTRY;
    this.type_atk_bonus = 0;
    this.type_pow_bonus = 0;
    this.type_def_bonus = 1;
    this.type_toughness_bonus = 1;
    this.type_morale_bonus = 0;
    this.type_cost_mod = 1.0;
  }

  get_type_status()
  {
    return this.type_status;
  }

  set_type_status(type)
  {
    if (type in unit_types)
    {
      this.type_status = type;
      switch(type)
      {
        case unit_types.LEVIES:
          this.type_atk_bonus = 0;
          this.type_pow_bonus = 0;
          this.type_def_bonus = 0;
          this.type_toughness_bonus = 0;
          this.type_morale_bonus = -1;
          this.type_cost_mod = 0.75;
          break;
        case unit_types.INFANTRY:
          this.type_atk_bonus = 0;
          this.type_pow_bonus = 0;
          this.type_def_bonus = 1;
          this.type_toughness_bonus = 1;
          this.type_morale_bonus = 0;
          this.type_cost_mod = 1.0;
          break;
        case unit_types.ARCHERS:
          this.type_atk_bonus = 0;
          this.type_pow_bonus = 1;
          this.type_def_bonus = 0;
          this.type_toughness_bonus = 0;
          this.type_morale_bonus = 1;
          this.type_cost_mod = 1.75;
          break;
        case unit_types.CAVALRY:
          this.type_atk_bonus = 1;
          this.type_pow_bonus = 1;
          this.type_def_bonus = 0;
          this.type_toughness_bonus = 0;
          this.type_morale_bonus = 2;
          this.type_cost_mod = 1.5;
          break;
        case unit_types.FLYING:
          this.type_atk_bonus = 0;
          this.type_pow_bonus = 0;
          this.type_def_bonus = 0;
          this.type_toughness_bonus = 0;
          this.type_morale_bonus = 3;
          this.type_cost_mod = 2.0;
          break;
        case unit_types.SIEGE_ENGINE:
          this.type_atk_bonus = 1;
          this.type_pow_bonus = 1;
          this.type_def_bonus = 0;
          this.type_toughness_bonus = 1;
          this.type_morale_bonus = 0;
          this.type_cost_mod = 1.5;
          break;
        default:
          break;
      }
      return true;
    }
    return false;
  }
}

class Unit_Experience
{
  constructor()
  {
    this.exp_status = exp_types.GREEN;
    this.exp_atk_bonus = 0;
    this.exp_pow_bonus = 0;
    this.exp_def_bonus = 0;
    this.exp_toughness_bonus = 0;
    this.exp_morale_bonus = 0;
  }

  get_exp_status()
  {
    return this.type_status;
  }

  set_exp_status(type)
  {
    if (type in unit_types)
    {
      this.exp_status = type;
      switch(type)
      {
        case exp_types.NONE:
          this.exp_atk_bonus = 0;
          this.exp_toughness_bonus = 0;
          this.exp_morale_bonus = 0;
          break;
        case exp_types.GREEN:
          this.exp_atk_bonus = 0;
          this.exp_toughness_bonus = 0;
          this.exp_morale_bonus = 0;
          break;
        case exp_types.REGULAR:
          this.exp_atk_bonus = 1;
          this.exp_toughness_bonus = 1;
          this.exp_morale_bonus = 1;
          break;
        case exp_types.SEASONED:
          this.exp_atk_bonus = 1;
          this.exp_toughness_bonus = 1;
          this.exp_morale_bonus = 2;
          break;
        case exp_types.VETERAN:
          this.exp_atk_bonus = 1;
          this.exp_toughness_bonus = 1;
          this.exp_morale_bonus = 3;
          break;
        case exp_types.ELITE:
          this.exp_atk_bonus = 2;
          this.exp_toughness_bonus = 2;
          this.exp_morale_bonus = 4;
          break;
        case exp_types.SUPER_ELITE:
          this.exp_atk_bonus = 2;
          this.exp_toughness_bonus = 2;
          this.exp_morale_bonus = 5;
          break;
        default:
          break;
      }
      return true;
    }
    return false;
  }
}

class Unit_Equipment
{

  constructor()
  {
    this.equip_status = unit_equips.LIGHT;
    this.equip_atk_bonus = 0;
    this.equip_pow_bonus = 1;
    this.equip_def_bonus = 1;
    this.equip_toughness_bonus = 0;
    this.equip_morale_bonus = 0;
  }

  get_equip_status()
  {
    return this.equip_status;
  }

  set_equip_status(equipment)
  {
    if (equipment in unit_equips)
    {
      this.equip_status = equipment;
      switch(equipment)
      {
        case unit_equips.NONE:
          this.equip_pow_bonus = 0;
          this.equip_def_bonus = 0;
          break;
        case unit_equips.LIGHT:
          this.equip_pow_bonus = 1;
          this.equip_def_bonus = 1;
          break;
        case unit_equips.MEDIUM:
          this.equip_pow_bonus = 2;
          this.equip_def_bonus = 2;
          break;
        case unit_equips.HEAVY:
          this.equip_pow_bonus = 4;
          this.equip_def_bonus = 4;
          break;
        case unit_equips.SUPER_HEAVY:
          this.equip_pow_bonus = 6;
          this.equip_def_bonus = 6;
          break;
        default:
          break;
      }
      return true;
    }
    return false;
  }
}

class Unit_Ancestry
{

  constructor()
  {
    this.ancestry_name = "NONE";
    this.ancestry_atk_bonus = 0;
    this.ancestry_pow_bonus = 0;
    this.ancestry_def_bonus = 0;
    this.ancestry_toughness_bonus = 0;
    this.ancestry_morale_bonus = 0;
    this.ancestry_head_trait = null;
  }

  get_ancestry_name()
  {
    return this.ancestry_name;
  }

  set_ancestry_name(name)
  {
    if (typeof name === 'string' || name instanceof String)
    {
      this.ancestry_name = name;
      return true;
    }
    return false;
  }

  get_ancestry_atk()
  {
    return this.ancestry_atk_bonus;
  }

  set_ancestry_atk(atk)
  {
    if (isInteger(atk))
    {
      this.ancestry_atk_bonus = atk;
      return true;
    }
    return false;
  }

  get_ancestry_pow()
  {
    return this.ancestry_pow_bonus;
  }

  set_ancestry_pow(pow)
  {
    if (isInteger(pow))
    {
      this.ancestry_pow_bonus = pow;
      return true;
    }
    return false;
  }

  get_ancestry_def()
  {
    return this.ancestry_def_bonus;
  }

  set_ancestry_def(def)
  {
    if(isInteger(def))
    {
      this.ancestry_def_bonus = def;
      return true;
    }
    return false;
  }

  get_ancestry_toughness()
  {
    return this.ancestry_toughness_bonus;
  }

  set_ancestry_toughness(toughness)
  {
    if(isInteger(toughness))
    {
      this.ancestry_toughness_bonus = toughness;
      return true;
    }
    return false;
  }

  get_ancestry_morale()
  {
    return this.ancestry_morale_bonus;
  }

  set_ancestry_morale(morale)
  {
    if(isInteger(morale))
    {
      this.ancestry_morale_bonus = morale;
      return true;
    }
    return false;
  }

  get_ancestry_head_trait()
  {
    return this.ancestry_head_trait;
  }

  set_ancestry_head_trait(trait)
  {
    if(trait instanceof Unit_Trait)
    {
      this.ancestry_head_trait = trait;
      return true;
    }
    return false;
  }
}

class SF_Unit
{

  constructor(name, commander)
  {
    this.name = name;
    this.commander = commander;

    this.ancestry = null;
    this.attitude = null;
    this.experience = null;
    this.equipment = null;
    this.unit_type = null;
    this.unit_size = null;
    this.traits = null;
    this.orders = null;

    this.atk_mod = 0;
    this.pow_mod = 0;
    this.def_mod = 0;
    this.tough_mod = 0;
    this.morale_mod = 0;
    this.casualties = 0;
    this.unit_cost = 0;
    this.cost_mod = 0;
    this.upkeep = 0;

    this.is_diminished = 0;
    this.are_mercenaries = 0;
  }

  get_name()
  {
    return this.name;
  }

  set_name(name)
  {
    if(typeof name === 'string' || name instanceof String)
    {
      this.name = name;
      return true;
    }
    return false;
  }

  get_commander()
  {
    return this.commander;
  }

  set_commander(commander)
  {
    if(typeof commander === 'string' || commander instanceof String)
    {
      this.commander = commander;
      return true;
    }
    return false;
  }

  get_ancestry()
  {
    return this.ancestry;
  }

  set_ancestry(ancestry)
  {
    if(ancestry instanceof Unit_Ancestry)
    {
      this.ancestry = ancestry;
      calculate_stats();
      calculate_cost();
      return true;
    }
    return false;
  }

  get_attitude()
  {
    return this.attitude;
  }

  set_attitude(attitude)
  {
    if(attitude instanceof Unit_Attitude)
    {
      this.attitude = attitude;
      calculate_stats();
      calculate_cost();
      return true;
    }
    return false;
  }

  get_experience()
  {
    return this.experience()
  }

  set_experience(experience)
  {
    if(experience instanceof Unit_Experience)
    {
      this.experience = experience;
      calculate_stats();
      calculate_cost();
      return true;
    }
    return false;
  }

  get_equipment()
  {
    return this.equipment;
  }

  set_equipment(equipment)
  {
    if(equipment instanceof Unit_Equipment)
    {
      this.equipment = equipment;
      calculate_stats();
      calculate_cost();
      return true;
    }
    return false;
  }

  get_unit_type()
  {
    return this.unit_type;
  }

  set_unit_type(unit_type)
  {
    if (unit_type instanceof Unit_Type)
    {
      this.unit_type = unit_type;
      check_diminished();
      calculate_stats();
      calculate_cost();
      return true;
    }
    return false;
  }

  get_unit_size()
  {
    return this.unit_size;
  }

  set_unit_size(unit_size)
  {
    if(unit_size instanceof Unit_Size)
    {
      this.unit_size = unit_size;
      this.casualties = 0;
      calculate_stats();
      calculate_cost();
      return true;
    }
    return false;
  }

  get_traits()
  {
    return this.traits;
  }

  set_traits(trait)
  {
    if(trait instanceof Unit_Trait)
    {
      this.traits = trait;
      calculate_cost();
      return true;
    }
    return false;
  }

  get_orders()
  {
    return this.orders;
  }

  set_orders(order)
  {
    if(order instanceof Unit_Order)
    {
      this.orders = order;
      return true;
    }
    return false;
  }

  get_atk_mod()
  {
    return this.atk_mod;
  }

  set_atk_mod(atk_mod)
  {
    if(isInteger(atk_mod))
    {
      this.atk_mod = atk_mod;
      return true;
    }
    return false;
  }

  get_pow_mod()
  {
    return this.pow_mod;
  }

  set_pow_mod(pow_mod)
  {
    if(isInteger(pow_mod))
    {
      this.pow_mod = pow_mod;
      return true;
    }
    return false;
  }

  get_def_mod()
  {
    return this.def_mod;
  }

  set_def_mod(def_mod)
  {
    if(isInteger(def_mod))
    {
      this.def_mod = def_mod;
      return true;
    }
    return false;
  }

  get_tough_mod()
  {
    return this.tough_mod;
  }

  set_tough_mod(tough_mod)
  {
    if(isInteger(tough_mod))
    {
      this.tough_mod = tough_mod;
      return true;
    }
    return false;
  }

  get_morale_mod()
  {
    return this.morale_mod;
  }

  set_morale_mod(morale_mod)
  {
    if(isInteger(morale_mod))
    {
      this.morale_mod = morale_mod;
      return true;
    }
    return false;
  }

  calculate_stats()
  {
    atk_bonus = ancestry.get_ancestry_atk() + experience.exp_atk_bonus
                + equipment.equip_atk_bonus + unit_type.type_atk_bonus;
    set_atk_mod(atk_bonus);
    pow_bonus = ancestry.get_ancestry_pow() + experience.exp_pow_bonus
                + equipment.equip_pow_bonus + unit_type.type_pow_bonus;
    set_pow_mod(pow_bonus);
    def_bonus = ancestry.get_ancestry_def() + experience.exp_def_bonus
                + equipment.equip_def_bonus + unit_type.type_def_bonus;
    set_def_mod(def_bonus);
    tough_bonus = ancestry.get_ancestry_toughness()
                  + experience.exp_toughness_bonus
                  + equipment.equip_toughness_bonus
                  + unit_type.type_toughness_bonus;
    set_tough_mod(tough_bonus);
    morale_bonus = ancestry.get_ancestry_morale() + experience.exp_morale_bonus
                   + equipment.equip_morale_bonus + unit_type.type_morale_bonus;
    set_morale_mod(morale_bonus);
  }

  get_casualties()
  {
    return this.casualties;
  }

  set_casualties(casualties)
  {
    if(isInteger(casualties)
       && 0 <= casualties
       && casualties <= unit_size.get_size_status())
    {
      this.casualties = casualties;
      check_diminished();
      return true;
    }
    return false;
  }

  get_unit_cost()
  {
    return this.unit_cost;
  }

  get_cost_mod()
  {
    return this.cost_mod;
  }

  get_unit_upkeep()
  {
    return this.upkeep;
  }

  set_cost_mod(cost_mod)
  {
    if(isInteger(cost_mod))
    {
      this.cost_mod = cost_mod;
      calculate_cost();
      return true;
    }
    return false;
  }

  calculate_cost()
  {
    cost_total = 0;
    calculate_stats();
    // First, add up bonuses to stats (with double morale)
    stat_total = cost_stat_calc();
    // Then multiply by unit type cost modifier
    cost_total += (stat_total * unit_type.type_cost_mod);
    // Then multiply it by unit size cost modifier
    cost_total *= unit_size.size_cost_mod;
    // Then multiply the result by 10
    cost_total *= 10;

    // Add the cost of all the traits the unit has
    current_trait = traits;
    while(current_trait != null)
    {
      cost_total += current_trait.trait_cost;
      current_trait = current_trait.next_trait;
    }

    // Finally add a flat 30 points
    cost_total += 30;

    cost_total *= attitude.attitude_cost_mod;

    unit_cost = cost_total.toFixed();
    calculate_upkeep();
  }

  cost_stat_calc()
  {
    return atk_mod + def_mod + pow_mod + tough_mod + (2 * morale_mod);
  }

  calculate_upkeep()
  {
    upkeep_total = unit_cost / 10;
    if (are_mercenaries)
    {
      upkeep = upkeep_total * 2;
      return;
    }
    upkeep = upkeep_total;
  }

  get_is_diminished()
  {
    return is_diminished;
  }

  check_diminished()
  {
    let ratio = casualties / unit_size.get_size_status();
    if (ratio >= 0.50)
    {
      is_diminished = true;
    }
    else if (unit_type.get_type_status() === unit_types.LEVIES)
    {
      is_diminished = true;
    }
    is_diminished = false;
  }

  get_mercenary_status()
  {
    return this.are_mercenaries;
  }

  set_mercenary_status(status)
  {
    if (typeof status === 'boolean')
    {
      this.are_mercenaries = status;
      calculate_cost();
      return true;
    }
    return false;
  }

}

module.exports = {
  load_default_traits: function ()
  {
    AMPHIBIOUS = new Unit_Trait();
    AMPHIBIOUS.trait_name = "Amphibious";
    AMPHIBIOUS.trait_description = "This unit does not suffer terrain penalties for fighting in water or on land.";
    AMPHIBIOUS.trait_cost = 50;

    BRED_FOR_WAR = new Unit_Trait();
    BRED_FOR_WAR.trait_name = "Bred For War";
    BRED_FOR_WAR.trait_description = "This unit cannot be diminished, and cannot have disadvantage on Morale checks.";
    BRED_FOR_WAR.trait_cost = 100;

    BRUTAL = new Unit_Trait();
    BRUTAL.trait_name = 'Brutal';
    BRUTAL.trait_description = "This unit inflicts 2 casualties on a successful Power check.";
    BRUTAL.trait_cost = 200;

    COURAGEOUS = new Unit_Trait();
    COURAGEOUS.trait_name = 'Courageous';
    COURAGEOUS.trait_description = "Once per battle, this unit can choose to succeed on a Morale check it just failed.";
    COURAGEOUS.trait_cost = 50;

    ETERNAL = new Unit_Trait();
    ETERNAL.trait_name = "Eternal";
    ETERNAL.trait_description = "This unit cannot be horrified, and it always succeeds on Morale checks to attack undead and fiends.";
    ETERNAL.trait_cost = 50;

    FRENZY = new Unit_Trait();
    FRENZY.trait_name = "Frenzy";
    FRENZY.trait_description = "If this unit diminishes an enemy unit, it immediately makes a free attack against that unit.";
    FRENZY.trait_cost = 50;

    HORRIFY = new Unit_Trait();
    HORRIFY.trait_name = "Horrify";
    HORRIFY.trait_description = "If this unit inflicts a casualty on an enemy unit, that unit must make a DC 15 Morale check. Failure exhausts the unit.";
    HORRIFY.trait_cost = 200;

    MARTIAL = new Unit_Trait();
    MARTIAL.trait_name = 'Martial';
    MARTIAL.trait_description = "If this unit succeeds on a Power check and its size is greater than the defending unit, it inflicts 2 casualties.";
    MARTIAL.trait_cost = 100;

    MINDLESS = new Unit_Trait();
    MINDLESS.trait_name = 'Mindless';
    MINDLESS.trait_description = "This unit cannot fail Morale Checks";
    MINDLESS.trait_cost = 100;

    REGENERATE = new Unit_Trait();
    REGENERATE.trait_name = 'Regenerate';
    REGENERATE.trait_description = "When this unit refreshes, increment its casualty die. This trait ceases to function if the unit suffers a casualty from battle magic."
    REGENERATE.trait_cost = 200;

    RAVENOUS = new Unit_Trait();
    RAVENOUS.trait_name = 'Ravenous';
    RAVENOUS.trait_description = "While any enemy unit is diminished, this unit can spend a round feeding on the corpses to increment their casualty die.";
    RAVENOUS.trait_cost = 50;

    HURL_ROCKS = new Unit_Trait();
    HURL_ROCKS.trait_name = "Hurl Rocks";
    HURL_ROCKS.trait_description = "If this unit succeeds on an Attack check, it inflicts 2 casualties. against fortifications, it inflicts 1d6 casualties.";
    HURL_ROCKS.trait_cost = 250;

    SAVAGE = new Unit_Trait();
    SAVAGE.trait_name = "Savage";
    SAVAGE.trait_description = "This unit has advantage on the first Attack check it makes each battle.";
    SAVAGE.trait_cost = 50;

    STALWART = new Unit_Trait();
    STALWART.trait_name = "Stalwart";
    STALWART.trait_description = "Enemy battle magic has disadvantage on Power checks against this unit.";
    STALWART.trait_cost = 50;

    TRAIT_TWISTING_ROOTS = new Unit_Trait();
    TRAIT_TWISTING_ROOTS.trait_name = "Twisting Roots";
    TRAIT_TWISTING_ROOTS.trait_description = "As an action, this unit can sap the walls of a fortification. Siege units have advantage on Power checks against sapped fortifications.";
    TRAIT_TWISTING_ROOTS.trait_cost = 200;

    UNDEAD = new Unit_Trait();
    UNDEAD.trait_name = "Undead";
    UNDEAD.trait_description = "Green and regular troops must pass a Morale check to attack this unit. Each enemy unit need only do this once."
    UNDEAD.trait_cost = 50;
  },
  load_default_sizes: function ()
  {
    UNIT_SMALL = new Unit_Size();
    UNIT_SMALL.set_size_status(sizes.SMALL);

    UNIT_MEDIUM = new Unit_Size();
    UNIT_MEDIUM.set_size_status(sizes.MEDIUM);

    UNIT_LARGE = new Unit_Size();
    UNIT_LARGE.set_size_status(sizes.LARGE);

    UNIT_HUGE = new Unit_Size();
    UNIT_HUGE.set_size_status(sizes.HUGE);

    UNIT_COLOSSAL = new Unit_Size();
    UNIT_COLOSSAL.set_size_status(sizes.COLOSSAL);
  },
  load_default_orders: function ()
  {
    ATTACK_UNIT = new Unit_Order();
    ATTACK_UNIT.order_name = "Attack Unit";
    ATTACK_UNIT.order_description = "Attacks a valid unit in range.";

    CHARGE_UNIT = new Unit_Order();
    CHARGE_UNIT.order_name = "Charge at Unit";
    CHARGE_UNIT.order_description = "A Charge is an attack with advantage on the Attack check. On a successful Power check, a Charge inflicts 2 casualties, and the charging unit becomes engaged with the defending unit.";

    DISENGAGE_UNIT = new Unit_Order();
    DISENGAGE_UNIT.order_name = "Disengage Unit";
    DISENGAGE_UNIT.order_description = "Attacking units that are engaged can choose to disengage, making a DC 13 Morale check to disengage. On a successful check, the unit is successfully disengaged and can attack another unit."

    ENGAGE_UNIT = new Unit_Order();
    ENGAGE_UNIT.order_name = "Engage Unit";
    ENGAGE_UNIT.order_description = "Engages a valid enemy unit in range. When engaged, two units can only attack eachother. The attacking unit can choose to disengage as an order. Defending units cannot disengage. The attacking unit must make a successful DC 13 Morale check to disengage on the next turn. Engaged Units cannot Charge";

    ORDER_TWISTING_ROOTS = new Unit_Order();
    ORDER_TWISTING_ROOTS.order_name = "Twisting Roots";
    ORDER_TWISTING_ROOTS.order_description = "As an action, this unit can sap the walls of a fortification. Siege units have advantage on Power checks against sapped fortifications.";

    RETREAT = new Unit_Order();
    RETREAT.order_name = "Retreat";
    RETREAT.order_description = "Makes a DC 15 Morale check, and removes the unit from play. "
  },
  load_default_attitudes: function ()
  {
    ATTITUDE_ALLIED = new Unit_Attitude();
    ATTITUDE_ALLIED.set_status(attitudes.ALLIED);

    ATTITUDE_FRIENDLY = new Unit_Attitude();
    ATTITUDE_FRIENDLY.set_status(attitudes.FRIENDLY);

    ATTITUDE_NEUTRAL = new Unit_Attitude();
    ATTITUDE_NEUTRAL.set_status(attitudes.NEUTRAL);
  },
  load_default_experience: function ()
  {
    EXP_NONE = new Unit_Experience();
    EXP_NONE.set_exp_status(exp_types.NONE);

    EXP_GREEN = new Unit_Experience();
    EXP_GREEN.set_exp_status(exp_types.GREEN);

    EXP_REGULAR = new Unit_Experience();
    EXP_REGULAR.set_exp_status(exp_types.REGULAR);

    EXP_SEASONED = new Unit_Experience();
    EXP_SEASONED.set_exp_status(exp_types.SEASONED);

    EXP_VETERAN = new Unit_Experience();
    EXP_VETERAN.set_exp_status(exp_types.VETERAN);

    EXP_ELITE = new Unit_Experience();
    EXP_ELITE.set_exp_status(exp_types.ELITE);

    EXP_SUPER_ELITE = new Unit_Experience();
    EXP_ELITE.set_exp_status(exp_types.SUPER_ELITE);
  },
  load_default_equipment: function ()
  {
    EQP_NONE = new Unit_Equipment();
    EQP_NONE.set_equip_status(unit_equips.NONE);

    EQP_LIGHT = new Unit_Equipment();
    EQP_LIGHT.set_equip_status(unit_equips.LIGHT);

    EQP_MEDIUM = new Unit_Equipment();
    EQP_MEDIUM.set_equip_status(unit_equips.MEDIUM);

    EQP_HEAVY = new Unit_Equipment();
    EQP_HEAVY.set_equip_status(unit_equips.HEAVY);

    EQP_SUPER_HEAVY = new Unit_Equipment();
    EQP_SUPER_HEAVY.set_equip_status(unit_equips.SUPER_HEAVY);
  },
  load_default_ancestries: function ()
  {
    return false;
  },
  load_default_types: function ()
  {
    return false;
  }
};
module.exports.attitudes = attitudes;
module.exports.unit_types = unit_types;
module.exports.unit_equips = unit_equips;
module.exports.exp_types = exp_types;
module.exports.sizes = sizes;
module.exports.Unit_Trait = Unit_Trait;
module.exports.Unit_Order = Unit_Order;
module.exports.Unit_Size = Unit_Size;
module.exports.Unit_Attitude = Unit_Attitude;
module.exports.Unit_Type = Unit_Type;
module.exports.Unit_Experience = Unit_Experience;
module.exports.Unit_Ancestry = Unit_Ancestry;
module.exports.SF_Unit = SF_Unit;
