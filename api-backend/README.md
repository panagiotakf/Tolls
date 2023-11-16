# API - Back-end

Περιεχόμενα:

- RESTful API.
- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).

Συγκεκριμένα, τo api-backend συντελείται από:
 1) Ένα κεντικό αρχείο JS (index.js) το οποίο διαχειρίζεται τις κλήσεις προς το backend, στην πύλη 9103 του backend server, και στέλνει τα requests αυτά στα ανίστοιχα JS αρχέια των endoint(βλ. ).
 2) Το αρχείο package.json που περιέχει τα απαραίτητα modules.
 3) Τα csv αρχεία stations.csv και vehicles.csv που περιέχουν τα data για τα endpoints: ResetStation και ResetVehicles (βλ. ).
 4) Τον φάκελο endpoints που περιέχει τους JS κώδικες για κάθε endpoint:
- AdminHealthCheck.js: Παράμετροι: {} -> Αποτελέσματα (json object ή CSV αρχέιο): {status:string,dbconnection:object}  Περιγραφή: (Μόνο για Admins) Ελέγχει την σύνδεση με την βάση.
- AdminResetPasses.js: Παράμετροι: {}  -> Αποτελέσματα (json object):{status:string}  Περιγραφή: (Μόνο για Admins) Αρχικοποίηση Πίνακα Διελεύσεων.
- AdminResetStations.js: Παράμετροι:{} -> Αποτελέσματα (json object):{status:string}  Περιγραφή: (Μόνο για Admins) Αρχικοποίηση Πίνακα Σταθμών.
- AdminResetVehicles.js: Παράμετροι:{} -> Αποτελέσματα (json object):{status:string} Περιγραφή: (Μόνο για Admins) Αρχικοποίηση Πίνακα Tags.
- ChargesBy.js: Παράμετροι:{op1_ID:string,date_from:YYYYMMDD,date_to:YYYYMMDD}  -> Αποτελέσματα (json object ή CSV αρχέιο): {op1_ID:string,RequestTimestamp:string,PeriodFrom:string,PeriodTo:string,PPOList:array} Περιγραφή: Επιστρέφει τον αριθμό των διελεύσεων σε σταθούς του op_ID, από tags των άλλων παρόχων, όπως επίσης και μια λίστα με το συνολικό κόστος των διευλεύσεων αυτών, για κάθε πάροχο, στο δοσμένο χρονικό διάστημα.
- DebtAnalysis.js: Παράμετροι:{op1_ID:string,date_from:YYYYMMDD,date_to:YYYYMMDD}  -> Αποτελέσματα (json object ή CSV αρχέιο): {op1_ID:string,RequestTimestamp:string,PeriodFrom:string,PeriodTo:string,PPOList:array} Περιγραφή: Επιστρέφει, για τον op_ID, μια λίστα με τις οφειλές από/προς κάθε άλλο πάροχο.
- Debts.js: Παράμετροι:{op1_ID:string,op2_ID:string,date_from:YYYYMMDD,date_to:YYYYMMDD}  -> Αποτελέσματα (json object ή CSV αρχέιο): {op1_ID:string,RequestTimestamp:string,PeriodFrom:string,PeriodTo:string,Debt:number} Περιγραφή: Επιστρέφει την οφειλή μεταξύ των δύο δοθέντων παρόχων, op1_ID και op2_ID, στο δοσμένο χρονικό διάστημα.
- LastPayment.js: Παράμετροι:{op1_ID:string}  -> Αποτελέσματα (json object ή CSV αρχέιο):array  Περιγραφή: Επιστρέφει, για τον op_ID, τις ημερομηνίες τελευταίας εξόφλησης με κάθε άλλο πάροχο.
- PassesAnalysis.js: Παράμετροι:{op1_ID:string,op2_ID:string,date_from:YYYYMMDD,date_to:YYYYMMDD}  -> Αποτελέσματα (json object ή CSV αρχέιο): {op1_ID:string,op2_ID:string,RequestTimestamp:string,PeriodFrom:string,PeriodTo:string,NumberofPasses:number,PassList:array} Περιγραφή: Επιστρέφει λίστα με τις διελεύσεις των tags του op2_ID, από σταθμούς του op1_ID, στο δοσμένο χρονικό διάστημα.
- PassesCost.js: Παράμετροι:{op1_ID:string,op2_ID:string,date_from:YYYYMMDD,date_to:YYYYMMDD}  -> Αποτελέσματα (json object ή CSV αρχέιο): {op1_ID:string,op2_ID:string,RequestTimestamp:string,PeriodFrom:string,PeriodTo:string,NumberofPasses:number,PassCost:number}   Περιγραφή: Επιστρέφει τον αριθμό των διελεύσεων των tags του op2_ID, από σταθμούς του op1_ID, όπως επίσης και το συνολικό κόστος των διευλεύσεων αυτών, στο δοσμένο χρονικό διάστημα.
- PassesPerStation.js: Παράμετροι:{Station:string,date_from:YYYYMMDD,date_to:YYYYMMDD}  -> Αποτελέσματα (json object ή CSV αρχέιο): {Station:string,StationOperator:string,RequestTimestamp:string,PeriodFrom:string,PeriodTo:string,NumberofPasses:number,PassList:array}   Περιγραφή: Επιστρέφει λίστα με τις διελεύσεις από το σταθμό stationID, στο δοσμένο χρονικό διάστημα.
- Payoff.js: Παράμετροι:{op1_ID:string,op2_ID:string,pspId:string,amount:number,date:YYYYMMDD} -> Αποτελέσματα:{status:string}  Περιγραφή: (Μόνο για τους PSPs) Επιτρέπει την καταχώρηση ημερομηνίας εξόφλησης μεταξύ των παρόχων op1_ID και op2_ID, από τον pspID.
