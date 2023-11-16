#!/usr/bin/env python3
import requests
import json

def resetvehicles():
	#headers = {'x-observatory-auth' : ar.apikey}
    res = requests.post('https://localhost:9103/interoperability/api/admin/resetvehicles', verify=False)
    print(res.status_code)
    print(res.json())
    return True
