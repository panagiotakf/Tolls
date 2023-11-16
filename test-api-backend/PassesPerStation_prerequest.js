var Station= pm.request.url.variables.get('Station');
pm.environment.set("Station",Station);
var date_from= pm.request.url.variables.get('date_from');
pm.environment.set("date_from",date_from);
var date_to= pm.request.url.variables.get('date_to');
pm.environment.set("date_to",date_to);
