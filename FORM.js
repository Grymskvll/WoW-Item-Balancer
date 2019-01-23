class form {
	constructor() {
		this.info_form = document.getElementById('infoForm')
		this.exp	= document.getElementById('expansion')
		this.qual	= document.getElementById('itemquality')
		this.cat	= document.getElementById('itemcategory')
		this.slot	= document.getElementById('itemslot')
		this.type	= document.getElementById('itemtype')
		this.ilvl	= document.getElementById('ilvl')

		this.budget_total	= document.getElementById('totalbudget')
		this.budget_cons	= document.getElementById('consumedbudget')
		this.budget_rem		= document.getElementById('unusedbudget')
		this.ilvl_cur		= document.getElementById('currentilvl')

		this.fields = {
			stat_field			: document.getElementById('statsField'),
			damage_field		: document.getElementById('dpsField'),
			armor_field			: document.getElementById('armorField'),
			block_field			: document.getElementById('blockValField'),
			durability_field	: document.getElementById('durabilityField'),
		}

		this.stored = document.getElementsByClassName("storeSel")
		for (let i=0; i < this.stored.length; i++) {
			this.stored[i].addEventListener("input", this.UpdateStoredValue);
		}

		this.stats_form = document.getElementById('statsContent')
		this.stats = document.getElementById("statsDiv")
		this.BINameMax = 0
		this.BINameRecycled = []
		this.stat_rows = []

		this.damage_form	= document.getElementById('dpsForm')
		this.damage_mode	= function() { return document.querySelector('input[name="dpsMode"]:checked') }
		this.damage_sel		= document.getElementById('dpsSel')
		this.damage_out 	= document.getElementById('dpsOut')
		this.damage_speed	= document.getElementById('speed')
		this.damage_range	= document.getElementById('dpsRangeOut')
		this.damage_min 	= document.getElementById('damageMin')
		this.damage_max 	= document.getElementById('damageMax')
		this.damage_final 	= document.getElementById('dpsFinal')

		this.armor_form		= document.getElementById('armorForm')
		this.armor_mode		= function() { return document.querySelector('input[name="armorMode"]:checked') }
		this.armor_out		= document.getElementById('armorOut')
		this.armor_sel		= document.getElementById('armorSel')
		this.armor_final	= document.getElementById('armorFinal')

		this.block_form		= document.getElementById('blockValForm')
		this.block_mode		= function() { return document.querySelector('input[name="blockValMode"]:checked') }
		this.block_out		= document.getElementById('blockValOut')
		this.block_sel		= document.getElementById('blockValSel')
		this.block_final	= document.getElementById('blockValFinal')

		this.durability_form	= document.getElementById('durabilityForm')
		this.durability_mode	= function() { return document.querySelector('input[name="durabilityMode"]:checked') }
		this.durability_out		= document.getElementById('durabilityOut')
		this.durability_sel		= document.getElementById('durabilitySel')
		this.durability_final	= document.getElementById('durabilityFinal')

		let coll = document.getElementsByClassName("collapsible");	
		for (let i = 0; i < coll.length; i++) {
			coll[i].addEventListener("click", this.CollapsibleToggle);
		}

		// Hacky solution to the issue of the damage range slider being pushed 
		// around, leading to unintended value on mouse-release.
		let fixed = document.getElementsByClassName("range-fixed")
		for (let i = 0; i < fixed.length; i++) {
			fixed[i].addEventListener("mousedown", this.FixedOnMouseDown);
			fixed[i].addEventListener("mouseleave", this.FixedOnMouseLeave);
		}
	}

	FixedOnMouseDown(event) {
		var pos = event.target.getBoundingClientRect();
		var h = event.target.clientHeight
		var w = event.target.clientWidth
		event.target.style.position = 'fixed'
		event.target.style.top = pos.top + 'px'
		event.target.style.left = pos.left + 'px'
		event.target.style.height = h + 'px'
		event.target.style.width = w + 'px'
	}
	FixedOnMouseLeave(event) {
		event.target.style.position = 'static'
		event.target.style.height = null
		event.target.style.width = null
		event.target.disabled = false
	}

	AddStatRow() {
		let virtual = document.getElementById("statRowVirtual")
		let stat_row = virtual.cloneNode(true)
		stat_row.removeAttribute("id")
		stat_row.display = "table-row"
	
		stat_row.BIName = this.GetBIName()
		stat_row.statRadios = []
		stat_row.statSel = stat_row.getElementsByClassName('statSel')[0]
		stat_row.statSel.oldStatID = -1
		stat_row.statSel.options[0].statID = -1
		this.PopulateStatSel(stat_row.statSel)
	
		let radios = stat_row.getElementsByClassName("statModeRadio")
		for (let i=0; i<radios.length; i++) {
			radios[i].name = "statMode" + stat_row.BIName
			stat_row.statRadios.push(radios[i])
		}

		stat_row.budgetRadios = []
		radios = stat_row.getElementsByClassName("budgetModeRadio")
		for (let i=0; i<radios.length; i++) {
			radios[i].name = "budgetMode" + stat_row.BIName
			stat_row.budgetRadios.push(radios[i])
		}
		stat_row.budget_function = stat_row.getElementsByClassName('budgetFunction')[0]
		this.PopulateBudgetFunctionSel(stat_row.budget_function)
	
		stat_row.function = stat_row.getElementsByClassName('statFunction')[0]
		this.PopulateStatFunctionSel(stat_row.function)
	
		stat_row.radioResult = stat_row.getElementsByClassName('statBaseIn')[0]
		stat_row.extraResult = stat_row.getElementsByClassName('statExtraIn')[0]
		stat_row.totalResult = stat_row.getElementsByClassName('statFinalOut')[0]
		stat_row.totalRounded = stat_row.getElementsByClassName('statFinalRounded')[0]
		stat_row.budgetResult = stat_row.getElementsByClassName('statBudgetIn')[0]
	
		this.stats.appendChild(stat_row)
		this.stat_rows.push(stat_row)
	}
	GetBIName() {
		let name = this.BINameRecycled.pop()
		if (name == null) {
			name = ++this.BINameMax
		}
		return name
	}
	RemoveStatRow(stat_row, forceRemove=false) {
		if (stat_row.statSel.selectedIndex==0 && forceRemove==false) {
			return
		}

		this.BINameRecycled.push(stat_row.BIName)
		this.stats.removeChild(stat_row);
	
		let index = this.stat_rows.indexOf(stat_row);
		if (index > -1) {
			this.stat_rows.splice(index, 1);
		}
	
		this.UpdateStatOpts()
		this.Update(this.stats_form)
	}

	PopulateStatFunctionSel(sel) {
		let exp = this.GetExpansionName()
		if (!exp) return
		for (let function_name of CONF.GetStatFunctionNames(exp)) {
			let opt = document.createElement("option")
			opt.text = function_name
			sel.add(opt);
		}
	}

	PopulateBudgetFunctionSel(sel) {
		let exp = this.GetExpansionName()
		if (!exp) return
		for (let function_name of CONF.GetStatModFunctionNames(exp)) {
			let opt = document.createElement("option")
			opt.text = function_name
			sel.add(opt);
		}
	}

	UpdateStatOpts() {
		let currentStats = {}
	
		// Oops unnecessary repetition
		// Remind me to fix this after the brain fog goes away
		// Oops the brain fog never goes away
		for (let i in this.stat_rows) {
			let statRow = this.stat_rows[i]
			let statSel = statRow.statSel
			let text = statSel.options[statSel.selectedIndex].text
			currentStats[text] = true
		}
	
		for (let i in this.stat_rows) {
			let statRow = this.stat_rows[i]
			let statSel = statRow.statSel
			for (let i=1; i<statSel.options.length; i++) {
				let statString = statSel.options[i].text
				statSel.options[i].disabled = currentStats[statString]
			}
		}
	}
	
	StatSelChanged(evt) {
		let sel = evt.target
		let statRow = sel.parentElement.parentElement	// 🔫
		let opt = sel.options[sel.selectedIndex]
		let newStatID = opt.statID
		if (newStatID == -1) {
			this.RemoveStatRow(statRow)
		} else if (sel.oldStatID == -1) {
			this.AddStatRow()
		}
		sel.oldStatID = newStatID;
		this.UpdateStatOpts()
	}

	PopulateStatSel(statSel) {
		let exp = this.GetExpansionName()
		if (!exp) return
		for (let statType of CONF.GetStatNames(exp)) {
			let opt = document.createElement("option");
			opt.text = statType
			statSel.add(opt);
		}
	}
	
	CollapsibleToggle() {
		this.classList.toggle("active");
		let content = this.parentNode.nextElementSibling;
		if (content.style.maxHeight) 
		{
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = "100%"
		}
	}
	
	UpdateStoredValue(evt) {
		let sel = evt.target
		if (sel) {
			sel.storedValue = sel.options[sel.selectedIndex].text
		}
	}

	GetItemLevel() {
		if (this.ilvl.value && this.ilvl.checkValidity()) {
			return Number(this.ilvl.value)
		}
	}

	GetExpansion() 				{	return this.GetSelIndex(this.exp)		}
	GetQuality() 				{	return this.GetSelIndex(this.qual)		}
	GetCategory() 				{	return this.GetSelIndex(this.cat)		}
	GetSlot() 					{	return this.GetSelIndex(this.slot)		}
	GetType() 					{	return this.GetSelIndex(this.type)		}
	
	GetExpansionName() 			{	return this.GetSelText(this.exp)		}
	GetQualityName() 			{	return this.GetSelText(this.qual)		}
	GetCategoryName() 			{	return this.GetSelText(this.cat)		}
	GetSlotName() 				{	return this.GetSelText(this.slot)		}
	GetTypeName() 				{	return this.GetSelText(this.type)		}

	GetDamageMode()				{	return this.damage_mode().value			}
	GetDamageFunctionName()		{	return this.GetSelText(this.damage_sel)	}
	GetDamageOut()				{	return this.damage_out.value			}
	SetDamageOut(val)			{	this.damage_out.value = val				}
	GetDamageSpeed()			{	return this.damage_speed.value			}
	GetDamageRange()			{	return this.damage_range.value			}
	SetDamageMin(val)			{	this.damage_min.innerHTML = val			}
	SetDamageMax(val)			{	this.damage_max.innerHTML = val			}
	SetDamageFinal(val)			{	this.damage_final.innerHTML = val		}

	GetArmorMode()				{	return this.armor_mode().value			}
	GetArmorFunctionName()		{	return this.GetSelText(this.armor_sel)	}
	SetArmorOut(val)			{	this.armor_out.value = val				}
	GetArmorOut()				{	return this.armor_out.value				}
	SetArmorFinal(val)			{	this.armor_final.innerHTML = val		}

	GetBlockMode()				{	return this.block_mode().value			}
	GetBlockFunctionName()		{	return this.GetSelText(this.block_sel)	}
	SetBlockOut(val)			{	this.block_out.value = val				}
	GetBlockOut()				{	return this.block_out.value				}
	SetBlockFinal(val)			{	this.block_final.innerHTML = val		}

	GetDurabilityMode()			{	return this.durability_mode().value			}
	GetDurabilityFunctionName()	{	return this.GetSelText(this.durability_sel)	}
	SetDurabilityOut(val)		{	this.durability_out.value = val				}
	GetDurabilityOut()			{	return this.durability_out.value			}
	SetDurabilityFinal(val)		{	this.durability_final.innerHTML = val		}

	SetBudgetTotal(val)			{	this.budget_total.innerHTML = val		}
	SetBudgetConsumed(val) 		{	this.budget_cons.innerHTML = val		}
	SetBudgetUnused(val) 		{	this.budget_rem.innerHTML = val			}
	SetCurrentItemlevel(val) 	{	this.ilvl_cur.innerHTML = val			}

	

	UpdateStatsDisabled() {
		for (let i=0; i < this.stat_rows.length; i++) {
			let statRow = this.stat_rows[i]
			let setting = (statRow.statSel.selectedIndex == 0)
			let statInputs = statRow.getElementsByClassName('statInput')
			for (let j=0; j<statInputs.length; j++) {
				statInputs[j].disabled = setting
			}
		}
	}

	UpdateBudget() {
		this.SetBudgetTotal(this.item.GetBudgetTotal())
		this.SetBudgetConsumed(this.item.GetBudgetUsed())
		this.SetBudgetUnused(this.item.GetBudgetUnused())
		this.SetCurrentItemlevel(this.item.GetItemLevelFinal())
	}

	ToggleFields(disabled=true) {
		for (let k in this.fields) {
			let e = this.fields[k]
			e.disabled = disabled
			if (disabled) {
				e.parentNode.classList.add("content-disabled")
			} else {
				e.parentNode.classList.remove("content-disabled")
			}
		}
	}

	ResetAll() {
		this.ResetStatForm()
		this.ResetDPSForm()
		this.ResetArmorForm()
		this.ResetBlockValForm()
		this.ResetDurabilityForm()
		this.ResetItemInfo(true)
	}
	ResetItemInfo(update=false) {
		let sels = this.stored
		for (let i=0; i < sels.length; i++) {
			this.RemoveOptions(sels[i], 1)
			sels[i].storedValue = null
		}
		this.exp.selectedIndex = 0
		this.ilvl.value = null
		if (update) this.Update(this.info_form)
	}
	ResetStatForm(update=false) {
		while (this.stat_rows.length > 0) {
			this.RemoveStatRow(this.stat_rows[0], true)
		}
		this.AddStatRow()
		if (update) this.Update(this.stats_form)
	}
	ResetDPSForm() {
		this.damage_form.reset()
		this.RemoveOptions(this.damage_sel, 1)
		this.PopulateDPSFunctions()
		this.UpdateDPS()
	}
	ResetArmorForm() {
		this.armor_form.reset()
		this.RemoveOptions(this.armor_sel, 1)
		this.PopulateArmorFunctions()
		this.UpdateArmor()
	}
	ResetBlockValForm() {
		this.block_form.reset()
		this.RemoveOptions(this.block_sel, 1)
		this.PopulateBlockValFunctions()
		this.UpdateBlockValue()
	}
	ResetDurabilityForm() {
		this.durability_form.reset()
		this.RemoveOptions(this.durability_sel, 1)
		this.PopulateDurabilityFunctions()
		this.UpdateDurability()
	}

	PopulateDPSFunctions() {
		let exp = this.GetExpansionName()
		if (!exp) return
		let names = CONF.GetDPSFunctionNames(exp)
		this.PopulateFunctions(names, this.damage_sel)
	}
	PopulateArmorFunctions() {
		let exp = this.GetExpansionName()
		if (!exp) return
		let names = CONF.GetArmorFunctionNames(exp)
		this.PopulateFunctions(names, this.armor_sel)
	}
	PopulateBlockValFunctions() {
		let exp = this.GetExpansionName()
		if (!exp) return
		let names = CONF.GetBlockFunctionNames(exp)
		this.PopulateFunctions(names, this.block_sel)
	}
	PopulateDurabilityFunctions() {
		let exp = this.GetExpansionName()
		if (!exp) return
		let names = CONF.GetDurabilityFunctionNames(exp)
		this.PopulateFunctions(names, this.durability_sel)
	}
	PopulateFunctions(functions, sel) {
		if (this.GetExpansion() == 0) return
		for (let functionName of functions) {
			let opt = document.createElement("option");
			opt.text = functionName
			sel.add(opt);
		}
	}

	PopulateExpansions() {
		for (let confKey of CONF.GetConfigNames()) {
			let opt = document.createElement("option");
			opt.text = confKey
			this.exp.add(opt);
		}
	}

	PopulateQualities() {
		if (this.GetExpansion() == 0) return
		let exp = this.GetExpansionName()
		for (let quality of CONF.GetQualityNames(exp)) {
			let opt = document.createElement("option");
			opt.text = quality
			this.qual.add(opt);
		}
		let qual = this.qual.storedValue
		if (qual && CONF.ComboExists(exp, qual, null, null, null)) {
			for (let i=0; i < this.qual.options.length; i++) {
				if (qual == this.qual.options[i].text) {
					this.qual.selectedIndex = i
				}
			}
		} else {
			this.qual.storedValue = null
		}
	}

	PopulateItemCategories() {
		if (this.GetQuality() == 0) return
		let exp = this.GetExpansionName()
		for (let itemCat of CONF.GetCatNames(exp)) {
			let opt = document.createElement("option");
			opt.text = itemCat
			this.cat.add(opt);
		}
		let cat = this.cat.storedValue
		if (cat && CONF.ComboExists(exp, null, cat, null, null)) {
			for (let i=0; i < this.cat.options.length; i++) {
				if (cat == this.cat.options[i].text) {
					this.cat.selectedIndex = i
				}
			}
		} else {
			this.cat.storedValue = null
		}
	}

	PopulateItemSlots() {
		if (this.GetCategory() == 0) return
		
		let exp = this.GetExpansionName()
		let cat = this.GetCategoryName()
		for (let slotName of CONF.GetSlotNames(exp, cat)) {
			let opt = document.createElement("option");
			opt.text = slotName
			this.slot.add(opt);
		}
		let slot = this.slot.storedValue
		if (slot && CONF.ComboExists(exp, null, cat, slot, null)) {
			for (let i=0; i < this.slot.options.length; i++) {
				if (slot == this.slot.options[i].text) {
					this.slot.selectedIndex = i
				}
			}
		} else {
			this.slot.storedValue = null
		}
	}

	PopulateItemTypes() {
		if (this.GetSlot() == 0) return
		
		let exp = this.GetExpansionName()
		let cat = this.GetCategoryName()
		for (let itemType of CONF.GetTypeNames(exp, cat)) {
			let allowedSlots = CONF.GetAllowedSlots(exp, cat, itemType)
			let itemSlot = this.GetSlotName()
			if (!allowedSlots.includes(itemSlot)) continue
			let opt = document.createElement("option");
			opt.text = itemType
			this.type.add(opt);
		}
		let type = this.type.storedValue
		if (type && CONF.ComboExists(exp, null, cat, null, type)) {
			for (let i=0; i < this.type.options.length; i++) {
				if (type == this.type.options[i].text) {
					this.type.selectedIndex = i
				}
			}
		} else {
			this.type.storedValue = null
		}
	}

	ValidateSettings(log=false) {
		let errors = []
		if (this.GetExpansion() == 0)	errors.push("No expansion selected")
		if (this.GetQuality() == 0)		errors.push("No quality selected")
		if (this.GetCategory() == 0)	errors.push("No itemcategory selected")
		if (this.GetSlot() == 0)		errors.push("No itemslot selected")
		if (this.GetType() == 0)		errors.push("No itemtype selected")
		if (!this.GetItemLevel()) 		errors.push("Invalid ilvl")

		if (log) {
			for (let i=0; i<errors.length; i++) {
				console.log(errors[i])
			}
		}

		return errors
	}

	RemoveOptions(selectbox, remaining=0) {
		for(let i=selectbox.options.length-remaining; i>=1; i--) {
			selectbox.remove(i);
		}
		selectbox.selectedIndex = remaining == 1 ? 0 : selectbox.selectedIndex
	}

	ResetOptions(startIndex=0) {
		let opts = [
			"itemquality",
			"itemcategory",
			"itemslot",
			"itemtype",
		]
		for (let i=opts.length-startIndex-1; i < opts.length; i++) {
			let catSel = document.getElementById(opts[i]);
			this.RemoveOptions(catSel, 1)
		}
		if (startIndex >= 3) {
			let storedExp = this.exp.selectedIndex
			this.ResetStatForm()
			this.exp.selectedIndex = storedExp
			
			this.PopulateQualities()
			this.ResetDPSForm()
			this.ResetArmorForm()
			this.ResetBlockValForm()
			this.ResetDurabilityForm()
		}
		if (startIndex >= 2) this.PopulateItemCategories()
		if (startIndex >= 1) this.PopulateItemSlots()
		if (startIndex >= 0) this.PopulateItemTypes()	
	}

	Refresh() {
		for (let i=0; i < this.stored.length; i++) {
			this.stored[i].selectedIndex = 0
		}
		this.ilvl.value = null
		this.ResetAll()
	}
	GetSelText(sel) {
		if (sel.selectedIndex == 0) { 
			return null
		} else {
			return sel.options[sel.selectedIndex].text
		}
	}
	GetSelIndex(sel) {
		return sel.selectedIndex
	}

	
	GetStatMode(stat_row) {
		let name = 'statMode' + stat_row.BIName
		return stat_row.querySelector('input[name="' + name + '"]:checked').value
	}

	GetBudgetMode(stat_row) {
		let name = 'budgetMode' + stat_row.BIName
		return stat_row.querySelector('input[name="' + name + '"]:checked').value
	}

	GetStatBudgetMod(stat_row, stat_name) {
		let mode = this.GetBudgetMode(stat_row)

		switch(mode) {
			case 'default':
				return CONF.GetStatBudgetMod(this.item, stat_name)
			case 'function':
				let exp = this.GetExpansionName()
				if (this.GetSelIndex(stat_row.budget_function) == 0) return 0
				let f_name = this.GetSelText(stat_row.budget_function)
				let f = CONF.GetStatModFunction(exp, f_name)
				return f && f(this.item, stat_name) || 0
			case 'manual':
				return Number(stat_row.budgetResult.value)
			default:
				console.log("Unhandled budget mode")
		}
	}

	GetStats() {
		let stats = {}
		for (let i=0; i < this.stat_rows.length; i++) {
			let row = this.stat_rows[i]
			let stat_sel = row.statSel
			if (stat_sel.selectedIndex==0) continue
			
			let stat_name = this.GetSelText(stat_sel)
			let mode = this.GetStatMode(row)
			stats[mode] = stats[mode] || []

			let stat = {
				name		: stat_name,
				base		: Number(row.radioResult.value),
				extra		: Number(row.extraResult.value),
				// total		: Number(row.totalResult.value),
				mod			: this.GetStatBudgetMod(row, stat_name),
				row			: row,
				stat_mode	: mode,
				budget_mode	: this.GetBudgetMode(row),
			}
			if (mode=='function') {
				let exp = this.GetExpansionName()
				let f_name = this.GetSelText(row.function)
				stat.function = CONF.GetStatFunction(exp, f_name)
			}
			stats[mode].push(stat)
		}
		return stats
	}

	UpdateBlockValue() {
		if (this.GetBlockMode() == 'function') {
			this.block_out.disabled = true
			let exp = this.GetExpansionName()
			if (exp) {
				let f_name = this.GetBlockFunctionName()
				let blockValFunction = CONF.GetBlockFunction(exp, f_name)
				if (blockValFunction) this.SetBlockOut(blockValFunction(this.item))
			}
		} else {
			this.block_out.disabled = false
		}
		let block = round(this.GetBlockOut(), 0)
		if (isNaN(block)) block = 0
		this.SetBlockFinal(block)
	}
	UpdateArmor() {
		if (this.GetArmorMode() == 'function') {
			this.armor_out.disabled = true
			let exp = this.GetExpansionName()
			if (exp) {
				let f_name = this.GetArmorFunctionName()
				let armorFunction = CONF.GetArmorFunction(exp, f_name)
				if (armorFunction) this.SetArmorOut(armorFunction(this.item))
			}
		} else {
			this.armor_out.disabled = false
		}
		let armor = round(this.GetArmorOut(), 0)
		if (isNaN(armor)) armor = 0
		this.SetArmorFinal(armor)
	}
	UpdateDPS() {
		if (this.GetDamageMode() == 'function') {
			this.damage_out.disabled = true
			let exp = this.GetExpansionName()
			if (exp) {
				let f_name = this.GetDamageFunctionName()
				let dpsFunction = CONF.GetDPSFunction(exp, f_name)
				if (dpsFunction) this.SetDamageOut(dpsFunction(this.item))
			}
		} else {
			this.damage_out.disabled = false
		}

		let speed = this.GetDamageSpeed()
		let damage_avg = this.GetDamageOut() * speed
		let fluct = (this.GetDamageRange() / 100) * damage_avg;
		let min = Math.round(damage_avg - fluct)
		let max = Math.round(damage_avg + fluct)
		this.SetDamageMin(min)
		this.SetDamageMax(max)
		damage_avg = (max - min) / 2 + min
		let dps = round(damage_avg / speed, 1)
		if (isNaN(dps)) dps = 0
		this.SetDamageFinal(dps)
	}

	UpdateStats() {
		this.UpdateStatsDisabled()

		for (let mode in this.item.stats) {
			for (let stat of this.item.stats[mode]) {
				if (mode == 'split' || mode == 'function') {
					stat.row.radioResult.value = stat.base
					stat.row.radioResult.disabled = true
				} else {
					stat.row.radioResult.disabled = false
				}
				
				if (this.GetBudgetMode(stat.row) != 'manual') {
					stat.row.budgetResult.value = stat.mod
					stat.row.budgetResult.disabled = true
				} else {
					stat.row.budgetResult.disabled = false
				}

				stat.row.totalResult.value = stat.total
				let sign = stat.total >= 0 ? '+' : ''
				stat.row.totalRounded.value = `${sign}${round(stat.total,0)} ${stat.name}`
			}
		}
	}

	UpdateDurability() {
		if (this.GetDurabilityMode() == 'function') {
			this.durability_out.disabled = true
			let exp = this.GetExpansionName()
			if (exp) {
				let f_name = this.GetDurabilityFunctionName()
				let durabilityFunction = CONF.GetDurabilityFunction(exp, f_name)
				if (durabilityFunction) this.SetDurabilityOut(durabilityFunction(this.item))
			}
		} else {
			this.durability_out.disabled = false
		}
		let dura = round(this.GetDurabilityOut(), 0)
		if (isNaN(dura)) dura = 0
		this.SetDurabilityFinal(dura)
	}

	Update(element) {
		let errors = this.ValidateSettings()
		this.ToggleFields(errors.length > 0)
		if (errors.length > 0) return
		
		this.item = new ITEM()

		switch(element) {
			case this.info_form:
				this.UpdateDurability()
				this.UpdateDPS()
				this.UpdateArmor()
				this.UpdateBlockValue()
				this.UpdateBudget()
				this.UpdateStats()
				break;
			case this.stats_form:
				this.UpdateBudget()
				this.UpdateStats()
				break
			case this.damage_form:
				this.UpdateDPS()
				break
			case this.armor_form:
				this.UpdateArmor()
				break
			case this.block_form:
				this.UpdateBlockValue()
				break
			case this.durability_form:
				this.UpdateDurability()
				break
			default:
				console.log("Unhandled FORM update")
		} 
	}
}