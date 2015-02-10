
//===========================================================================
// PROPERTIES
//===========================================================================
var navigation = Alloy.Globals.navigation = Alloy.createController("navigation");

//===========================================================================
// END OF PROPERTIES
//===========================================================================
/* -- Bootstrap your application below this line -- */
//===========================================================================
// FUNCTIONS
//===========================================================================

var init = function()
{
// App configuration
	var conf = {
		index: "mainPage",
		// index: "baseView",
		defaultOpenTransition: {transition: 'slideInFromRight', duration: 150},
		defaultBackTransition: {transition: 'slideInFromLeft', duration: 150},
		indexOptions: {
			topLevel: true,
			viewMode: 'nav',
			title: '',
			identifier: 'index',
		},
		historyLimit: 10,
		confirmOnExit: true,
	};
	navigation.init(conf);
	// configuartion for distribution build
	if(Alloy.CFG.APPLICATION_BUILD == Alloy.CFG.BUILD.DISTRIBUTION)
	{


	
	}
	else
	{

	}
	
};






//===========================================================================
// END OF FUNCTIONS
//===========================================================================	
//===========================================================================
// LOGICS
//===========================================================================
init();
//===========================================================================
// END OF LOGICS
//===========================================================================