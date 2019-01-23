{
	const QUALITY = {
		TEMPLATE_QUAL : "TEMPLATE_QUAL",
	}
	const CATEGORY = {
		TEMPLATE_CAT : "TEMPLATE_CAT",
	}
	const SLOT = {
		TEMPLATE_SLOT : "TEMPLATE_SLOT",
	}
	const TYPE = {
		TEMPLATE_TYPE : "TEMPLATE_TYPE",
	}
	const STAT = {
		TEMPLATE_STAT : "TEMPLATE_STAT",
	}

	const CONFIG_DATA = {
		ItemCategories : {
			[CATEGORY.TEMPLATE_CAT] : {
				Slots : {
					[SLOT.TEMPLATE_SLOT] : {
						SlotBudgetMod : 1,
						SlotDPSMod : 1,
						SlotArmorMod : 1,
						SlotBlockValMod : 1,
						SlotDurabilityMod : 1,
					},
				},
				Types : {
					[TYPE.TEMPLATE_TYPE] : {
						AllowedSlots : [
							SLOT.TEMPLATE_SLOT,
						],
						TypeBudgetMod : 1,
						TypeDPSMod : 1,
						TypeArmorMod : 1,
						TypeBlockValMod : 1,
						TypeDurabilityMod : 1,
					},
				},
			}
		},

		DPSFunctions : {
			"Template DPS function" : function(item) {
				return 1
			},
		},

		ArmorFunctions : {
			"Template Armor function" : function(item) {
				return 1
			},
		},

		BlockValueFunctions : {
			"Template Block Value function" : function(item) {
				return 1
			},
		},

		StatModFunctions : {
			"Template Stat Mod function" : function(item, stat_name) {
				return 1
			},
		},

		DurabilityFunctions : {
			"Template Durability function" : function(item) {
				return 1
			},
		},

		StatBudgetFunctions : {
			StatModded : function(item, stat_unmodded, statMod) {
				return 1
			},
			StatUnmodded : function(item, stat_modded, statMod) {
				return 1
			},
			BudgetFromStat : function(item, stat, statMod) {
				return 1
			},
			StatFromBudget : function(item, budget, statMod) {
				return 1
			},
			BudgetFromItemLevel : function(item) {
				return 1
			},
			ItemLevelFromBudget : function(item) {
				return 1
			},
		},

		StatFunctions : {
			"Template Stat function" : function(item) {
				return 1
			},
		},

		ItemQualities : {
			[QUALITY.TEMPLATE_QUAL] : {
				QualityBudgetMod 		: 1,
				QualityDPSMod 			: 1,
				QualityArmorMod 		: 1,
				QualityBlockValMod 		: 1,
				QualityDurabilityMod	: 1,
			},
		},

		StatTypes : {
			[STAT.TEMPLATE_STAT] : {
				StatBudgetMod : 1,
			},
		},
	}
	CONF.CONFIG_QUEUE.DEC(document.currentScript.src, CONFIG_DATA)
}