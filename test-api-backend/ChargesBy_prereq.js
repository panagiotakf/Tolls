var op1_ID= pm.request.url.variables.get('op1_ID');
pm.environment.set("op1_ID",op1_ID);
var date_from= pm.request.url.variables.get('date_from');
pm.environment.set("date_from",date_from);
var date_to= pm.request.url.variables.get('date_to');
pm.environment.set("date_to",date_to);

