#!/usr/bin/env python3
import requests
import json

def healthcheck():
	#headers = {'x-observatory-auth' : ar.apikey}
	res = requests.get('https://localhost:9103/interoperability/api/admin/healthcheck', verify=False)
	print(res.status_code)
	print(res.json())
	return True
