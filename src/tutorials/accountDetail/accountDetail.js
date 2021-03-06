
function setAccountNumber(accountNumber){
	$("input[name=accountNumber").val(accountNumber);
	FSBL.Clients.WindowClient.setWindowTitle(accountNumber);
	FSBL.Clients.LinkerClient.publish({dataType:"account", data:accountNumber});
	setState(accountNumber);
}

// STEP 6
function setState(accountNumber){
	/*
	FSBL.Clients.WindowClient.setComponentState({ field: 'accountNumber', value: accountNumber });
	*/
}
function getState(){
	/*
	FSBL.Clients.WindowClient.getComponentState({
		field: 'accountNumber',
	}, function (err, state) {
		if (state === null) {
			getInitialCustomer();
			return;
		}
		setAccountNumber(state);
	});
	*/
}

// STEP 4
function communicateBetweenComponents(){
	/**/
	$("next").click(function(){
		FSBL.Clients.RouterClient.query("accountTraversal", {action:"next"}, function(err, response){
			if(err){
				alert("Error: " + err);
			}else{
				setAccountNumber(response.data);
			}
		});
	});
}

// STEP 3
function listenForCustomer(){
	FSBL.Clients.RouterClient.addListener(FSBL.Clients.WindowClient.options.name, function(err, response){
		if(err) return;
		setAccountNumber(response.data);
	});
}

// STEP 2
function getInitialCustomer(){
	var accountNumber=FSBL.Clients.WindowClient.getSpawnData()["accountNumber"];
	setAccountNumber(accountNumber);
}

FSBL.addEventListener("onReady", function () {
	listenForCustomer();
	communicateBetweenComponents();
	getState();
});