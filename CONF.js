let CONF = function () {
	let configs = {}

	let LoadConfigs = function() {
		// The LORD saw that the wickedness of man was great in the earth, and that 
		// every intention of the thoughts of his heart was only evil continually.
		// And the LORD regretted that he had made man on the earth, and it grieved him to his heart.
		for (let key in CONFIG_FILES) {
			let imported = document.createElement('script');
			imported.src = CONFIG_FILES[key]
			document.head.appendChild(imported);
			CONFIG_QUEUE.INC()
		}
	}

	let GetBudgetFromStat = function(item, stat, stat_mod) {
		let neg = stat < 0
		stat = Math.abs(stat)
		let budget = configs[item.exp].StatBudgetFunctions.BudgetFromStat(item, stat, stat_mod)
		if (neg) budget = -budget
		return budget
	}

	let GetStatFromBudget = function(item, budget, stat_mod) {
		let neg = budget < 0
		budget = Math.abs(budget)
		let stat = configs[item.exp].StatBudgetFunctions.StatFromBudget(item, budget, stat_mod)
		if (neg) stat = -stat
		return stat
	}

	let GetAllowedSlots = function(exp, cat, type) {
		let slots = configs[exp].ItemCategories[cat].Types[type].AllowedSlots
		return slots || []
	}

	let GetStatBudgetMod = function(item, statString) {
		let statmod = configs[item.exp].StatTypes[statString].StatBudgetMod
		if (typeof(statmod) == 'function') {
			statmod = statmod(item)
		}
		
		return statmod
	}

	const MOD = {
		BUDGET_SLOT	: function (a) { return configs[a.exp].ItemCategories[a.cat].Slots[a.slot].SlotBudgetMod },
		BUDGET_TYPE	: function (a) { return configs[a.exp].ItemCategories[a.cat].Types[a.type].TypeBudgetMod },
		BUDGET_QUAL	: function (a) { return configs[a.exp].ItemQualities[a.qual].QualityBudgetMod },
		BLOCK_SLOT	: function (a) { return configs[a.exp].ItemCategories[a.cat].Slots[a.slot].SlotBlockValMod },
		BLOCK_TYPE	: function (a) { return configs[a.exp].ItemCategories[a.cat].Types[a.type].TypeBlockValMod },
		BLOCK_QUAL	: function (a) { return configs[a.exp].ItemQualities[a.qual].QualityBlockValMod },
		ARMOR_SLOT	: function (a) { return configs[a.exp].ItemCategories[a.cat].Slots[a.slot].SlotArmorMod },
		ARMOR_TYPE	: function (a) { return configs[a.exp].ItemCategories[a.cat].Types[a.type].TypeArmorMod },
		ARMOR_QUAL	: function (a) { return configs[a.exp].ItemQualities[a.qual].QualityArmorMod },
		DPS_SLOT	: function (a) { return configs[a.exp].ItemCategories[a.cat].Slots[a.slot].SlotDPSMod },
		DPS_TYPE	: function (a) { return configs[a.exp].ItemCategories[a.cat].Types[a.type].TypeDPSMod },
		DPS_QUAL	: function (a) { return configs[a.exp].ItemQualities[a.qual].QualityDPSMod },
		DURA_SLOT	: function (a) { return configs[a.exp].ItemCategories[a.cat].Slots[a.slot].SlotDurabilityMod },
		DURA_TYPE	: function (a) { return configs[a.exp].ItemCategories[a.cat].Types[a.type].TypeDurabilityMod },
		DURA_QUAL	: function (a) { return configs[a.exp].ItemQualities[a.qual].QualityDurabilityMod },
	}

	let GetBudgetSlotMod		= function(item) { return GetMod(item, MOD.BUDGET_SLOT) }
	let GetBudgetTypeMod		= function(item) { return GetMod(item, MOD.BUDGET_TYPE) }
	let GetBudgetQualityMod		= function(item) { return GetMod(item, MOD.BUDGET_QUAL) }
	let GetBlockValSlotMod		= function(item) { return GetMod(item, MOD.BLOCK_SLOT) }
	let GetBlockValTypeMod		= function(item) { return GetMod(item, MOD.BLOCK_TYPE) }
	let GetBlockValQualityMod	= function(item) { return GetMod(item, MOD.BLOCK_QUAL) }
	let GetArmorSlotMod			= function(item) { return GetMod(item, MOD.ARMOR_SLOT) }
	let GetArmorTypeMod			= function(item) { return GetMod(item, MOD.ARMOR_TYPE) }
	let GetArmorQualityMod		= function(item) { return GetMod(item, MOD.ARMOR_QUAL) }
	let GetDPSSlotMod			= function(item) { return GetMod(item, MOD.DPS_SLOT) }
	let GetDPSTypeMod			= function(item) { return GetMod(item, MOD.DPS_TYPE) }
	let GetDPSQualityMod		= function(item) { return GetMod(item, MOD.DPS_QUAL) }
	let GetDurabilitySlotMod	= function(item) { return GetMod(item, MOD.DURA_SLOT) }
	let GetDurabilityTypeMod	= function(item) { return GetMod(item, MOD.DURA_TYPE) }
	let GetDurabilityQualityMod	= function(item) { return GetMod(item, MOD.DURA_QUAL) }

	let GetMod = function(item, f) {
		let mod = f(item)
		if (typeof(mod) == 'function') {
			mod = mod(item)
		}
		return mod
	}

	let ComboExists = function(exp=null, qual=null, cat=null, slot=null, type=null) {
		if (exp && qual && !cat && !slot && !type)
			return configs[exp] && configs[exp].ItemQualities[qual]

		if (exp && !qual && cat && !slot && !type)
			return configs[exp] && configs[exp].ItemCategories[cat]
		
		if (exp && !qual && cat && slot && !type)
			return configs[exp] && configs[exp].ItemCategories[cat] && configs[exp].ItemCategories[cat].Slots[slot]
		
		if (exp && !qual && cat && !slot && type)
			return configs[exp] && configs[exp].ItemCategories[cat] && configs[exp].ItemCategories[cat].Types[type]

		return false
	}


	let CONFIG_QUEUE = {
		count : 0,
		INC : function() {
			this.count++
		},
		DEC : function(key, data) {
			this.count--
			key = key.replace(/^.*[\\\/]/, '')
			key = key.substr(0, key.lastIndexOf('.'))
			key = decodeURIComponent(key)
			configs[key] = data
			if (this.count == 0) {
				FORM.PopulateExpansions()
			}
		},
	}

	let verify = function(dict, key) {
		return dict && dict[key]
	}
	let GetConfigNames 				= function() { return Object.keys(configs || []) }
	let GetStatNames 				= function(exp) { return Object.keys(configs[exp].StatTypes || []) }
	let GetStatFunctionNames 		= function(exp) { return Object.keys(configs[exp].StatFunctions || []) }
	let GetDPSFunctionNames 		= function(exp) { return Object.keys(configs[exp].DPSFunctions || []) }
	let GetArmorFunctionNames 		= function(exp) { return Object.keys(configs[exp].ArmorFunctions || []) }
	let GetBlockFunctionNames 		= function(exp) { return Object.keys(configs[exp].BlockValueFunctions || []) }
	let GetQualityNames 			= function(exp) { return Object.keys(configs[exp].ItemQualities || []) }
	let GetCatNames 				= function(exp) { return Object.keys(configs[exp].ItemCategories || []) }
	let GetSlotNames 				= function(exp, cat) { return Object.keys(configs[exp].ItemCategories[cat].Slots || []) }
	let GetTypeNames 				= function(exp, cat) { return Object.keys(configs[exp].ItemCategories[cat].Types || []) }
	let GetStatModFunctionNames		= function(exp) { return Object.keys(configs[exp].StatModFunctions || []) }
	let GetDurabilityFunctionNames	= function(exp) { return Object.keys(configs[exp].DurabilityFunctions || []) }
	let GetStatFunction				= function(exp, f_n) { return verify(configs[exp].StatFunctions, f_n) }
	let GetBlockFunction 			= function(exp, f_n) { return verify(configs[exp].BlockValueFunctions, f_n) }
	let GetArmorFunction 			= function(exp, f_n) { return verify(configs[exp].ArmorFunctions, f_n) }
	let GetDPSFunction 				= function(exp, f_n) { return verify(configs[exp].DPSFunctions, f_n) }
	let GetStatModFunction			= function(exp, f_n) { return verify(configs[exp].StatModFunctions, f_n) }
	let GetDurabilityFunction		= function(exp, f_n) { return verify(configs[exp].DurabilityFunctions, f_n) }


	let GetBudgetFromItemLevel 	= function(item) { return configs[item.exp].StatBudgetFunctions.BudgetFromItemLevel(item) }
	let GetItemLevelFromBudget 	= function(item) { return configs[item.exp].StatBudgetFunctions.ItemLevelFromBudget(item) }
	let GetStatUnmodded 		= function(item, stat, mod) { return configs[item.exp].StatBudgetFunctions.StatUnmodded(item, stat, mod) }


	let pub = {
		LoadConfigs					: LoadConfigs,
		GetBudgetFromStat			: GetBudgetFromStat,
		GetStatFromBudget			: GetStatFromBudget,
		GetAllowedSlots				: GetAllowedSlots,
		GetStatBudgetMod			: GetStatBudgetMod,
		GetBudgetSlotMod			: GetBudgetSlotMod,
		GetBudgetTypeMod			: GetBudgetTypeMod,
		GetBudgetQualityMod			: GetBudgetQualityMod,
		GetBlockValSlotMod			: GetBlockValSlotMod,
		GetBlockValTypeMod			: GetBlockValTypeMod,
		GetBlockValQualityMod		: GetBlockValQualityMod,
		GetArmorSlotMod				: GetArmorSlotMod,
		GetArmorTypeMod				: GetArmorTypeMod,
		GetArmorQualityMod			: GetArmorQualityMod,
		GetDPSSlotMod				: GetDPSSlotMod,
		GetDPSTypeMod				: GetDPSTypeMod,
		GetDPSQualityMod			: GetDPSQualityMod,
		GetDurabilitySlotMod		: GetDurabilitySlotMod,
		GetDurabilityTypeMod		: GetDurabilityTypeMod,
		GetDurabilityQualityMod		: GetDurabilityQualityMod,

		GetConfigNames				: GetConfigNames,
		GetStatNames				: GetStatNames,
		GetStatFunctionNames		: GetStatFunctionNames,
		GetDPSFunctionNames			: GetDPSFunctionNames,
		GetArmorFunctionNames		: GetArmorFunctionNames,
		GetBlockFunctionNames		: GetBlockFunctionNames,
		GetQualityNames				: GetQualityNames,
		GetCatNames					: GetCatNames,
		GetSlotNames				: GetSlotNames,
		GetTypeNames				: GetTypeNames,
		GetStatFunction				: GetStatFunction,
		GetBlockFunction			: GetBlockFunction,
		GetArmorFunction			: GetArmorFunction,
		GetDPSFunction				: GetDPSFunction,
		GetStatModFunction			: GetStatModFunction,
		GetStatModFunctionNames		: GetStatModFunctionNames,
		GetDurabilityFunction		: GetDurabilityFunction,
		GetDurabilityFunctionNames	: GetDurabilityFunctionNames,

		GetBudgetFromItemLevel	: GetBudgetFromItemLevel,
		GetItemLevelFromBudget	: GetItemLevelFromBudget,
		GetStatUnmodded			: GetStatUnmodded,

		ComboExists				: ComboExists,

		CONFIG_QUEUE			: CONFIG_QUEUE,
	}

	return pub
}()