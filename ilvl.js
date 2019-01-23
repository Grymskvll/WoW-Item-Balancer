function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function Init() {
	FORM = new form()
	document.getElementById("iteminfocol").click()

	CONF.LoadConfigs()
	FORM.Refresh()
}

Init()