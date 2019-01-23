{
	const QUALITY = {
		"UNCOMMON" 	: "Uncommon (Green)",
		"RARE" 		: "Rare (Blue)",
		"EPIC"		: "Ebin (Epic (Purple))",
		"LEGENDARY"	: "Legendary",
	}
	const CATEGORY = {
		"WEAPONS" 		: "Weapons",
		"ARMOR" 		: "Armor",
		"JEWELRY" 		: "Jewelry",
		"MISCELLANEOUS"	: "Miscellaneous",
	}
	const SLOT = {
		"ONE_HAND" 			: "One-Hand",
		"TWO_HAND" 			: "Two-Hand",
		"OFF_HAND" 			: "Off-Hand",
		"MAIN_HAND" 		: "Main-Hand",
		"RANGED" 			: "Ranged",
		"HEAD" 				: "Head",
		"SHOULDER" 			: "Shoulder",
		"CHEST" 			: "Chest",
		"WAIST" 			: "Waist",
		"LEGS" 				: "Legs",
		"FEET" 				: "Feet",
		"WRISTS" 			: "Wrists",
		"HANDS" 			: "Hands",
		"BACK" 				: "Back",
		"NECK" 				: "Neck",
		"FINGER" 			: "Finger",
		"TRINKET" 			: "Trinket",
		"RELIC" 			: "Relic",
		"OFF_HAND_FRILL"	: "Off-Hand Frill",
		"SHIRT" 			: "Shirt",
		"TABARD" 			: "Tabard",
		"SHIELD" 			: "Shield" ,
	}
	const TYPE = {
		"DAGGER"			: "Dagger",
		"FIST_WEAPON"		: "Fist Weapon",
		"AXE"				: "Axe",
		"SWORD"				: "Sword",
		"MACE"				: "Mace",
		"STAFF"				: "Staff",
		"POLEARM"			: "Polearm",
		"BOW"				: "Bow",
		"CROSSBOW"			: "Crossbow",
		"GUN"				: "Gun",
		"THROWN"			: "Thrown",
		"WAND"				: "Wand",
		"CLOTH"				: "Cloth",
		"LEATHER"			: "Leather",
		"MAIL"				: "Mail",
		"PLATE"				: "Plate",
		"NECK"				: "Neck",
		"FINGER"			: "Finger",
		"TRINKET"			: "Trinket",
		"OFF_HAND_FRILL"	: "Off-Hand Frill",
		"SHIRT"				: "Shirt",
		"TABARD"			: "Tabard",
		"IDOL"				: "Idol",
		"LIBRAM"			: "Libram",
		"SIGIL"				: "Sigil",
		"TOTEM"				: "Totem",
		"SHIELD"			: "Shield",
	}
	const STAT = {
		"AGILITY"			: "Agility",
		"STRENGTH"			: "Strength",
		"INTELLECT"			: "Intellect",
		"SPIRIT"			: "Spirit",
		"STAMINA"			: "Stamina",
		"DEFENSE"			: "Defense Rating",
		"DODGE"				: "Dodge Rating",
		"PARRY"				: "Parry Rating",
		"BLOCK"				: "Block Rating",
		"HIT"				: "Hit Rating",
		"CRIT"				: "Crit Rating",
		"RESILIENCE"		: "Resilience Rating",
		"HASTE"				: "Haste Rating",
		"EXPERTISE"			: "Expertise Rating",
		"ATTACK_POWER"		: "Attack Power",
		"MANA_PER_5_SEC"	: "Mana per 5 sec",
		"ARMOR_PENETRATION"	: "Armor Penetration Rating",
		"SPELL_POWER"		: "Spell Power",
		"HEALTH_PER_5_SEC"	: "Health per 5 sec",
		"SPELL_PENETRATION"	: "Spell Penetration",
		"BLOCK_VALUE"		: "Block Value",
		"BONUS_ARMOR"		: "Bonus Armor",
		"SOCKET_RED"		: "Socket (Red)",
		"SOCKET_BLUE"		: "Socket (Blue)",
		"SOCKET_YELLOW"		: "Socket (Yellow)",
		"SOCKET_META"		: "Socket (Meta)",
	}

	const CONFIG_DATA = {
		ItemCategories : {
			[CATEGORY.WEAPONS] : {
				Slots : {
					[SLOT.ONE_HAND] : {
						SlotBudgetMod : 27/64,
						SlotDPSMod : 0.76903107856345,
						SlotDurabilityMod : 1.02,
					},
					[SLOT.TWO_HAND] : {
						SlotBudgetMod : 1.00,
						SlotDPSMod : 1,
						SlotDurabilityMod : 1.18,
					},
					[SLOT.OFF_HAND] : {
						SlotBudgetMod : 27/64,
						SlotDPSMod : 0.76903107856345,
						SlotDurabilityMod : 1.02,
					},
					[SLOT.MAIN_HAND] : {
						SlotBudgetMod : 27/64,
						SlotDPSMod : 0.76903107856345,
						SlotDurabilityMod : 1.02,
					},
					[SLOT.RANGED] : {
						SlotBudgetMod : 5/16,
						SlotDPSMod : 1,
						SlotDurabilityMod : 1,
					},
				},
				Types : {
					[TYPE.DAGGER] : {
						AllowedSlots : [
							SLOT.ONE_HAND,
							SLOT.OFF_HAND,
							SLOT.MAIN_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 0.68,
					},
					[TYPE.FIST_WEAPON] : {
						AllowedSlots : [
							SLOT.ONE_HAND,
							SLOT.OFF_HAND,
							SLOT.MAIN_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 0.68,
					},
					[TYPE.AXE] : {
						AllowedSlots : [
							SLOT.ONE_HAND,
							SLOT.TWO_HAND,
							SLOT.OFF_HAND,
							SLOT.MAIN_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 1,
					},
					[TYPE.SWORD] : {
						AllowedSlots : [
							SLOT.ONE_HAND,
							SLOT.TWO_HAND,
							SLOT.OFF_HAND,
							SLOT.MAIN_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 1,
					},
					[TYPE.MACE] : {
						AllowedSlots : [
							SLOT.ONE_HAND,
							SLOT.TWO_HAND,
							SLOT.OFF_HAND,
							SLOT.MAIN_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 1,
					},
					[TYPE.STAFF] : {
						AllowedSlots : [
							SLOT.TWO_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 1,
					},
					[TYPE.POLEARM] : {
						AllowedSlots : [
							SLOT.TWO_HAND,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 1,
					},
					[TYPE.BOW] : {
						AllowedSlots : [
							SLOT.RANGED,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 0.69485286534641,
						TypeDurabilityMod : 0.86,
					},
					[TYPE.CROSSBOW] : {
						AllowedSlots : [
							SLOT.RANGED,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 0.69485286534641,
						TypeDurabilityMod : 0.86,
					},
					[TYPE.GUN] : {
						AllowedSlots : [
							SLOT.RANGED,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 0.69485286534641,
						TypeDurabilityMod : 0.86,
					},
					[TYPE.THROWN] : {
						AllowedSlots : [
							SLOT.RANGED,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeDurabilityMod : 0,
					},
					[TYPE.WAND] : {
						AllowedSlots : [
							SLOT.RANGED,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1.4133256693476,
						TypeDurabilityMod : 0.7,
					},
				},
			},
			[CATEGORY.ARMOR] : {
				Slots : {
					[SLOT.HEAD] : {
						SlotBudgetMod : 1.00,
						SlotArmorMod : (13/16),
						SlotDurabilityMod : 1.088,
					},
					[SLOT.SHOULDER] : {
						SlotBudgetMod : 3/4,
						SlotArmorMod : (12/16),
						SlotDurabilityMod : 1.088,
					},
					[SLOT.CHEST] : {
						SlotBudgetMod : 1.00,
						SlotArmorMod : 1.00,
						SlotDurabilityMod : 1.90,
					},
					[SLOT.WAIST] : {
						SlotBudgetMod : 3/4,
						SlotArmorMod : (9/16),
						SlotDurabilityMod : 0.55,
					},
					[SLOT.LEGS] : {
						SlotBudgetMod : 1.00,
						SlotArmorMod : (14/16),
						SlotDurabilityMod : 1.39,
					},
					[SLOT.FEET] : {
						SlotBudgetMod : 3/4,
						SlotArmorMod : (11/16),
						SlotDurabilityMod : 0.833,
					},
					[SLOT.WRISTS] : {
						SlotBudgetMod : 9/16,
						SlotArmorMod : (7/16),
						SlotDurabilityMod : 0.55,
					},
					[SLOT.HANDS] : {
						SlotBudgetMod : 3/4,
						SlotArmorMod : (10/16),
						SlotDurabilityMod : 0.55,
					},
					[SLOT.BACK] : {
						SlotBudgetMod : 9/16,
						SlotArmorMod : (8/16),
						SlotDurabilityMod : 0,
					},
				},
				Types : {
					[TYPE.CLOTH] : {
						AllowedSlots : [
							SLOT.HEAD,
							SLOT.SHOULDER,
							SLOT.CHEST,
							SLOT.WAIST,
							SLOT.LEGS,
							SLOT.FEET,
							SLOT.WRISTS,
							SLOT.HANDS,
							SLOT.BACK,
						],
						TypeBudgetMod : 1,
						TypeArmorMod : 0.13397348844393,
						TypeDurabilityMod : 0.745,
					},
					[TYPE.LEATHER] : {
						AllowedSlots : [
							SLOT.HEAD,
							SLOT.SHOULDER,
							SLOT.CHEST,
							SLOT.WAIST,
							SLOT.LEGS,
							SLOT.FEET,
							SLOT.WRISTS,
							SLOT.HANDS,
						],
						TypeBudgetMod : 1,
						TypeArmorMod : 0.25187362586836,
						TypeDurabilityMod : 0.9191,
					},
					[TYPE.MAIL] : {
						AllowedSlots : [
							SLOT.HEAD,
							SLOT.SHOULDER,
							SLOT.CHEST,
							SLOT.WAIST,
							SLOT.LEGS,
							SLOT.FEET,
							SLOT.WRISTS,
							SLOT.HANDS,
						],
						TypeBudgetMod : 1,
						TypeArmorMod : 0.55951201704886,
						TypeDurabilityMod : 1.12,
					},
					[TYPE.PLATE] : {
						AllowedSlots : [
							SLOT.HEAD,
							SLOT.SHOULDER,
							SLOT.CHEST,
							SLOT.WAIST,
							SLOT.LEGS,
							SLOT.FEET,
							SLOT.WRISTS,
							SLOT.HANDS,
						],
						TypeBudgetMod : 1,
						TypeArmorMod : 1.00,
						TypeDurabilityMod : 1.30,
					},
				}
			},
			[CATEGORY.JEWELRY] : {
				Slots : {
					[SLOT.NECK] : {
						SlotBudgetMod : 9/16,
					},
					[SLOT.FINGER] : {
						SlotBudgetMod : 9/16,
					},
					[SLOT.TRINKET] : {
						SlotBudgetMod : 17/25,	// Uncertain
					},
				},
				Types : {
					[TYPE.NECK] : {
						AllowedSlots : [
							SLOT.NECK,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.FINGER] : {
						AllowedSlots : [
							SLOT.FINGER,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.TRINKET] : {
						AllowedSlots : [
							SLOT.TRINKET,
						],
						TypeBudgetMod : 1,
					},
				},
			},
			[CATEGORY.MISCELLANEOUS] : {
				Slots : {
					[SLOT.RELIC] : {
						SlotBudgetMod : 0,	// Uncertain
					},
					[SLOT.OFF_HAND_FRILL] : {
						SlotBudgetMod : 9/16,
					},
					[SLOT.SHIRT] : {
						SlotBudgetMod : 0,
					},
					[SLOT.TABARD] : {
						SlotBudgetMod : 0,
					},
					[SLOT.SHIELD] : {
						SlotBudgetMod : 9/16,
						SlotBlockValMod : 1.00,
						SlotArmorMod : 1.00,
						SlotDurabilityMod : 1.18,
					},
				},
				Types : {
					[TYPE.OFF_HAND_FRILL] : {
						AllowedSlots : [
							SLOT.OFF_HAND_FRILL,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.SHIRT] : {
						AllowedSlots : [
							SLOT.SHIRT,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.TABARD] : {
						AllowedSlots : [
							SLOT.TABARD,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.IDOL] : {
						AllowedSlots : [
							SLOT.RELIC,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.LIBRAM] : {
						AllowedSlots : [
							SLOT.RELIC,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.SIGIL] : {
						AllowedSlots : [
							SLOT.RELIC,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.TOTEM] : {
						AllowedSlots : [
							SLOT.RELIC,
						],
						TypeBudgetMod : 1,
					},
					[TYPE.SHIELD] : {
						AllowedSlots : [
							SLOT.SHIELD,
						],
						TypeBudgetMod : 1,
						TypeBlockValMod : 1.00,
						TypeArmorMod : 1.00,
						TypeDurabilityMod : 1,
					},
				},
			},
		},

		DPSFunctions : {
			// These seem super accurate.
			"WotLK Other weapons" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetDPSQualityMod()
				let sm = item.GetDPSSlotMod()
				let tm = item.GetDPSTypeMod()
				return (20.58881 * qm * Math.exp(0.009317*ilvl) + 53.775729) * sm * tm
			},
			"WotLK Epic 226+ Bows/Crossbows/Guns" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetDPSQualityMod()
				let sm = item.GetDPSSlotMod()
				let tm = item.GetDPSTypeMod()
				return (34.96519941367401 * qm * Math.exp(0.009111 * ilvl) -20.390310965957653) * sm * tm
			},

			// Caster weapons have weird DPS sometimes, especially non-epic.
			"WotLK Caster Two-hand/Main-hand" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetDPSQualityMod()
				let sm = item.GetDPSSlotMod()
				let tm = item.GetDPSTypeMod()

				let cm
				let slot = item.GetSlot()
				switch (slot) {
					case SLOT.TWO_HAND:
						cm = 0.67334584601064
						break
					case SLOT.MAIN_HAND:
						cm = 0.57731604632243
						break
					default:
						cm = 0
				}

				return ((20.58881 * qm * Math.exp(0.009317*ilvl) + 53.775729) * sm * tm) * cm
			},
		},

		ArmorFunctions : {
			// All: Values are estimated for itemlevels with no data points for that quality.
			// All: Only accurate for the stated quality/ilvl.

			// These are sometimes off by 1 armor.
			"WotLK armor Blue/Purple 138-284" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetArmorQualityMod()
				let sm = item.GetArmorSlotMod()
				let tm = item.GetArmorTypeMod()
				let a, b

				if (ilvl <= 180) {
					a = -123.36722573247746
					b = 12.49745604657071
				} else if (180 <= ilvl && ilvl <= 200) {
					a = 1055.5858713263206
					b = 5.928306793590
				} else if (200 <= ilvl && ilvl <= 234) {
					a = 1502.9907913216
					b = 3.7359946123409
				} else if (234 <= ilvl) {
					a = 306.77936116063
					b = 8.8417650965569
				}
				
				return (a + b * ilvl) * qm * tm * sm
			},
			"WotLK armor Green 130-182" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetArmorQualityMod()
				let sm = item.GetArmorSlotMod()
				let tm = item.GetArmorTypeMod()
				return (53.62528770974 + 11.477700656331459 * ilvl) * qm * tm * sm
			},

			// These are sometimes off by 1-2 armor.
			"WotLK shield Blue/Purple 154-277" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetArmorQualityMod()
				let sm = item.GetArmorSlotMod()
				let tm = item.GetArmorTypeMod()
				let a, b

				if (ilvl <= 178) {
					a = -434.51475429976
					b = 42.113449157639
				} else if (178 <= ilvl && ilvl <= 200) {
					a = 3614.2399518693
					b = 19.577779695658
				} else if (200 <= ilvl && ilvl <= 238) {
					a = 4971.7313390233
					b = 12.916117235041
				} else if (238 <= ilvl) {
					a = 1019.8320150352
					b = 29.749539893912
				}

				return (a + b * ilvl) * qm * tm * sm
			},
			"WotLK shield Green 130-182" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetArmorQualityMod()
				let sm = item.GetArmorSlotMod()
				let tm = item.GetArmorTypeMod()
				let a, b

				if (ilvl <= 137) {
					a = 186.25972295926
					b = 36.667854868286
				} else if (137 <= ilvl) {
					a = 180.70708699384
					b = 38.561587562532
				}

				return (a + b * ilvl) * qm * tm * sm
			},
		},

		BlockValueFunctions : {
			// Blue and Purple shields are accurate.
			// Green shields are +/- 1 block value.
			"WotLK shields 130-277" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetBlockValQualityMod()
				// let sm = item.GetBlockValSlotMod()
				// let tm = item.GetBlockValTypeMod()
				let a, b

				if (ilvl <= 137) {
					a = -37.093253292877
					b = 1.0909780380258
				} else if (137 <= ilvl && ilvl <= 178) {
					a = -65.096550849856
					b = 1.4758263380357
				} else if (178 <= ilvl && ilvl <= 200) {
					a = 99.639643271743
					b = 0.55709109028031
				} else if (200 <= ilvl && ilvl <= 238) {
					a = 135.5972032103
					b = 0.37707640717797
				} else if (239 <= ilvl) {
					a = 25.779826842489
					b = 0.84176323100472
				}

				return (a + b * ilvl) * qm
			},
		},

		StatModFunctions : {
			"cute dog" : function(item, stat_name) {
				return 123
			},
		},

		DurabilityFunctions : {
			"WotLK Armor & Weapons" : function(item) {
				let qm = item.GetDurabilitySlotMod()
				let tm = item.GetDurabilityTypeMod()
				let sm = item.GetDurabilityQualityMod()
				let cat = item.GetCategory()
				
				let a
				if (cat == CATEGORY.WEAPONS || cat == CATEGORY.MISCELLANEOUS)
					a = 15
				else if (cat == CATEGORY.ARMOR)
					a = 10
				else
					return 0

				return 5 * (round( (a * (qm * tm * sm) + 2), 0))
			},
		},

		StatBudgetFunctions : {
			// Major inaccuracies!
			// In many cases, the calculated budget/ilvl of an item is grossly inaccurate.

			// Budget relates to everything but the implicit stats of an item.
			// Includes:
			// 		stat_type1, stat_value1, stat_type2, stat_value2, etc.
			//		bonus armor
			//		sockets
			//		resistances
			// Excludes:
			// 		base armor (armor, shields)
			//		DPS (weapons)
			//		spell power from DPS sacrifice (weapons)
			//		base block value (shields)
			//		socket bonus (these are allegedly free)
			//		set bonus (these are allegedly free)

			// All: pairs of inverse functions. All are related to each other.

			// Single stat.
			// Two pairs of inverse functions.
			StatModded : function(item, stat_unmodded, statMod) {
				return stat_unmodded * statMod
			},
			StatUnmodded : function(item, stat_modded, statMod) {
				return stat_modded / statMod
			},
			BudgetFromStat : function(item, stat, statMod) {
				let stat_modded = this.StatModded(item, stat, statMod)
				return stat_modded ** (Math.log(2)/Math.log(1.5))
			},
			StatFromBudget : function(item, budget, statMod) {
				let stat_modded = (budget ** (1 / (Math.log(2)/Math.log(1.5))))
				return this.StatUnmodded(item, stat_modded, statMod)
			},

			// All of an item's stats.
			// One pair of inverse functions.
			BudgetFromItemLevel : function(item) {
				let ilvl = item.GetItemLevel()
				let sm = item.GetBudgetSlotMod()
				let tm = item.GetBudgetTypeMod()
				let qm = item.GetBudgetQualityMod()
				return ((Math.exp((ilvl + 351.63287038526) / 108.07831516045)) * sm * tm * qm) ** (Math.log(2)/Math.log(1.5))
			},
			ItemLevelFromBudget : function(item) {
				let budget_used = item.GetBudgetUsed()
				let sm = item.GetBudgetSlotMod()
				let tm = item.GetBudgetTypeMod()
				let qm = item.GetBudgetQualityMod()
				return 108.07831516045 * Math.log((budget_used ** (1 / (Math.log(2)/Math.log(1.5)))) / sm / tm / qm) -351.63287038526
			},
		},

		StatFunctions : {
			"WotLK weapon SP" : function(item) {
				let ilvl = item.GetItemLevel()
				let qm = item.GetBudgetQualityMod()
				return (2.505200708584 * (Math.exp((ilvl + 351.63287038526) / 108.07831516045)) - 4.6082187782054) * qm
			},
		},

		ItemQualities : {
			[QUALITY.UNCOMMON] : {
				QualityBudgetMod 		: 0.75672832408639,
				QualityDPSMod 			: 0.75672832408639,
				QualityArmorMod 		: 0.77042957929981,
				QualityBlockValMod 		: 0.92,
				QualityDurabilityMod	: 0.85,
			},
			[QUALITY.RARE] : {
				QualityBudgetMod 		: 0.86998419436957,
				QualityDPSMod 			: 0.86998419436957,
				QualityArmorMod 		: 0.96656006422408,
				QualityBlockValMod 		: 0.96656006422408,
				QualityDurabilityMod	: 1.02,
			},
			[QUALITY.EPIC] : {
				QualityBudgetMod 		: 1.00,
				QualityDPSMod 			: 1.00,
				QualityArmorMod 		: 1.00,
				QualityBlockValMod 		: 1.00,
				QualityDurabilityMod	: 1.245,
			},
			[QUALITY.LEGENDARY] : {
				QualityBudgetMod 		: 1.00,
				QualityDPSMod 			: 1.00,
				QualityArmorMod 		: 1.00,
				QualityBlockValMod 		: 1.00,
				QualityDurabilityMod	: 1.54,
			},
		},

		StatTypes : {
			[STAT.AGILITY] : {
				// statID : 3,
				StatBudgetMod : 1.00,
			},
			[STAT.STRENGTH] : {
				// statID : 4,
				StatBudgetMod : 1.00,
			},
			[STAT.INTELLECT] : {
				// statID : 5,
				StatBudgetMod : 1.00,
			},
			[STAT.SPIRIT] : {
				// statID : 6,
				StatBudgetMod : 1.00,
			},
			[STAT.STAMINA] : {
				// statID : 7,
				StatBudgetMod : 2/3,
			},
			[STAT.DEFENSE] : {
				// statID : 12,
				StatBudgetMod : 1.00,
			},
			[STAT.DODGE] : {
				// statID : 13,
				StatBudgetMod : 1.00,
			},
			[STAT.PARRY] : {
				// statID : 14,
				StatBudgetMod : 1.00,
			},
			[STAT.BLOCK] : {
				// statID : 15,
				StatBudgetMod : 1.00,
			},
			[STAT.HIT] : {
				// statID : 31,
				StatBudgetMod : 1.00,
			},
			[STAT.CRIT] : {
				// statID : 32,
				StatBudgetMod : 1.00,
			},
			[STAT.RESILIENCE] : {
				// statID : 35,
				StatBudgetMod : 1.00,
			},
			[STAT.HASTE] : {
				// statID : 36,
				StatBudgetMod : 1.00,
			},
			[STAT.EXPERTISE] : {
				// statID : 37,
				StatBudgetMod : 1.00,
			},
			[STAT.ATTACK_POWER] : {
				// statID : 38,
				StatBudgetMod : 0.50,
			},
			[STAT.MANA_PER_5_SEC] : {
				// statID : 43,
				StatBudgetMod : 2,
			},
			[STAT.ARMOR_PENETRATION] : {
				// statID : 44,
				StatBudgetMod : 1.00,
			},
			[STAT.SPELL_POWER] : {
				// statID : 45,
				StatBudgetMod : 107/124,
				// StatBudgetMod : 25/32,
			},
			[STAT.HEALTH_PER_5_SEC] : {
				// statID : 46,
				StatBudgetMod : 1.00,
			},
			[STAT.SPELL_PENETRATION] : {
				// statID : 47,
				StatBudgetMod : 0.8,
			},
			[STAT.BLOCK_VALUE] : {
				// statID : 48,
				StatBudgetMod : 13/40,
			},
			[STAT.BONUS_ARMOR] : {
				// statID: none (added to Armor field),
				StatBudgetMod : 1/14,
			},
			[STAT.SOCKET_RED] : {
				// statID: none,
				StatBudgetMod : function(item) {
					let quality = item.GetQuality()
					let quals = {
						[QUALITY.UNCOMMON]	: 18,
						[QUALITY.RARE]		: 24,
						[QUALITY.EPIC]		: 30,
						[QUALITY.LEGENDARY]	: 30,
					}
					return quals[quality] || 0
				},
			},
			[STAT.SOCKET_BLUE] : {
				// statID: none,
				StatBudgetMod : function(item) {
					let quality = item.GetQuality()
					let quals = {
						[QUALITY.UNCOMMON]	: 18,
						[QUALITY.RARE]		: 24,
						[QUALITY.EPIC]		: 30,
						[QUALITY.LEGENDARY]	: 30,
					}
					return quals[quality] || 0
				},
			},
			[STAT.SOCKET_YELLOW] : {
				// statID: none,
				StatBudgetMod : function(item) {
					let quality = item.GetQuality()
					let quals = {
						[QUALITY.UNCOMMON]	: 18,
						[QUALITY.RARE]		: 24,
						[QUALITY.EPIC]		: 30,
						[QUALITY.LEGENDARY]	: 30,
					}
					return quals[quality] || 0
				},
			},
			[STAT.SOCKET_META] : {
				// statID: none,
				StatBudgetMod : function(item) {
					let quality = item.GetQuality()
					let quals = {
						[QUALITY.UNCOMMON]	: 60,
						[QUALITY.RARE]		: 60,
						[QUALITY.EPIC]		: 60,
						[QUALITY.LEGENDARY]	: 60,
					}
					return quals[quality] || 0
				},
			},
		},
	}
	CONF.CONFIG_QUEUE.DEC(document.currentScript.src, CONFIG_DATA)
}