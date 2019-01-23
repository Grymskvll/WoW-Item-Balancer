class ITEM {
	constructor() {
		this.exp 	= FORM.GetExpansionName()
		this.qual	= FORM.GetQualityName()
		this.cat	= FORM.GetCategoryName()
		this.slot	= FORM.GetSlotName()
		this.type	= FORM.GetTypeName()
		this.ilvl 	= FORM.GetItemLevel()

		this.budget_qual_mod	= CONF.GetBudgetQualityMod(this)
		this.budget_slot_mod	= CONF.GetBudgetSlotMod(this)
		this.budget_type_mod	= CONF.GetBudgetTypeMod(this)

		this.dps_qual_mod	= CONF.GetDPSQualityMod(this)
		this.dps_slot_mod	= CONF.GetDPSSlotMod(this)
		this.dps_type_mod	= CONF.GetDPSTypeMod(this)

		this.armor_qual_mod	= CONF.GetArmorQualityMod(this)
		this.armor_slot_mod	= CONF.GetArmorSlotMod(this)
		this.armor_type_mod	= CONF.GetArmorTypeMod(this)

		this.block_qual_mod	= CONF.GetBlockValQualityMod(this)
		this.block_slot_mod	= CONF.GetBlockValSlotMod(this)
		this.block_type_mod	= CONF.GetBlockValTypeMod(this)

		this.dura_qual_mod = CONF.GetDurabilityQualityMod(this)
		this.dura_slot_mod = CONF.GetDurabilitySlotMod(this)
		this.dura_type_mod = CONF.GetDurabilityTypeMod(this)
		
		// this.block_function	= FORM.GetDamageFunctionName()
		// this.armor_function	= FORM.GetArmorFunctionName()
		// this.dps_function	= FORM.GetBlockFunctionName()

		this.stats			= FORM.GetStats()
		this.budget_total	= CONF.GetBudgetFromItemLevel(this)
		this.budget_used	= 0

		this.CalcStatsFunction()
		this.CalcStatsManual()
		
		this.budget_single	= this.CalcBudgetSingle()
		this.CalcStatsSplit()

		this.budget_unused	= this.budget_total - this.budget_used
		this.ilvl_final		= CONF.GetItemLevelFromBudget(this)
	}

	GetExpansion()	{ return this.exp	}
	GetQuality()	{ return this.qual	}
	GetCategory()	{ return this.cat	}
	GetSlot()		{ return this.slot	}
	GetType()		{ return this.type	}

	GetBudgetTotal()	{ return this.budget_total 	}
	GetBudgetUnused()	{ return this.budget_unused }
	GetBudgetUsed()		{ return this.budget_used 	}
	GetBudgetSingle()	{ return this.budget_single	}
	GetItemLevel()		{ return this.ilvl			}
	GetItemLevelFinal()	{ return this.ilvl_final	}
	
	GetBudgetSlotMod()			{	return this.budget_slot_mod	}
	GetBudgetTypeMod()			{	return this.budget_type_mod	}
	GetBudgetQualityMod()		{	return this.budget_qual_mod	}
	GetDPSSlotMod()				{	return this.dps_slot_mod	}
	GetDPSTypeMod()				{	return this.dps_type_mod	}
	GetDPSQualityMod()			{	return this.dps_qual_mod	}
	GetArmorSlotMod()			{	return this.armor_slot_mod	}
	GetArmorTypeMod()			{	return this.armor_type_mod	}
	GetArmorQualityMod()		{	return this.armor_qual_mod	}
	GetBlockValSlotMod()		{	return this.block_slot_mod	}
	GetBlockValTypeMod()		{	return this.block_type_mod	}
	GetBlockValQualityMod()		{	return this.block_qual_mod	}
	GetDurabilitySlotMod()		{	return this.dura_slot_mod	}
	GetDurabilityTypeMod()		{	return this.dura_type_mod	}
	GetDurabilityQualityMod()	{	return this.dura_qual_mod	}

	CalcStatsFunction() {
		if (!this.stats.function) return
		for (let stat of this.stats.function) {
			if (stat.function)
				stat.base = stat.function(this)
			else
				stat.base = 0

			stat.total = stat.base + stat.extra
			stat.budget = CONF.GetBudgetFromStat(this, stat.total, stat.mod)

			this.budget_used += stat.budget
		}
	}
	CalcStatsManual() {
		if (!this.stats.manual) return
		for (let stat of this.stats.manual) {
			stat.total = stat.base + stat.extra
			stat.budget = CONF.GetBudgetFromStat(this, stat.total, stat.mod)

			this.budget_used += stat.budget
		}
	}
	CalcStatsSplit() {
		if (!this.stats.split) return
		for (let stat of this.stats.split) {
			stat.base = CONF.GetStatFromBudget(this, this.budget_single, stat.mod)
			stat.total = stat.base + stat.extra
			stat.budget = CONF.GetBudgetFromStat(this, stat.total, stat.mod)
			
			this.budget_used += stat.budget
		}
	}

	Diff(f, x, dx=0.00000000001) {
		return (f.call(this, x+dx) - f.call(this, x)) / dx;
	}

	CalcBudgetSingle(guess=this.GetStartingGuess(), max_iter=100) {
		let func = this.PrepSplitFunction()	
		let guess_new, e
		let i = 0
		do {
			if(i > max_iter) break
			guess_new = guess - func.call(this, guess) / this.Diff(func, guess)
			e = Math.abs(guess-guess_new)
			guess = guess_new
	
			i++
		} while (e > 0.01)
	
		if (i > max_iter) {
			console.log('Failed to calculate split budget.')
			return 0
		}

		let single = CONF.GetBudgetFromStat(this, guess, 1)
	
		return single
	}
	PrepSplitFunction() {
		let func = function(guess) {
			let res = 0

			let count = this.stats.split && this.stats.split.length || 0
			for (let i=0; i<count; i++) {
				let stat_name = this.stats.split[i].name
				let stat_extra = this.stats.split[i].extra
				let stat_mod = CONF.GetStatBudgetMod(this, stat_name)
				res += this.GetSplitBudget(stat_extra, stat_mod, guess)
			}
			res -= this.budget_total - this.budget_used

			return res
		}
		return func
	}
	GetSplitBudget(stat_extra, stat_mod, guess=null) {
		let stat_base = CONF.GetStatUnmodded(this, guess, stat_mod)
		let b_single_base = CONF.GetBudgetFromStat(this, stat_base, stat_mod)
		let b_single_total = CONF.GetBudgetFromStat(this, stat_base + stat_extra, stat_mod)
		let b_single_extra = b_single_total - b_single_base
		let budget_single = b_single_base + b_single_extra

		return budget_single
	}
	GetStartingGuess() {
		let extras = []

		let count = this.stats.split && this.stats.split.length || 0
		for (let i=0; i<count; i++) {
			let stat_name = this.stats.split[i].name
			let stat_extra = this.stats.split[i].extra
			let stat_mod = CONF.GetStatBudgetMod(this, stat_name)
			extras.push(stat_extra * stat_mod)
		}
		return Math.abs(Math.min(...extras)) + 1
	}
}