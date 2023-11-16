#!/usr/bin/env python3
import argparse
import json
import csv
import requests
from datetime import date
from pathlib import Path


def lastpayment(ar):
    url = 'https://localhost:9103/interoperability/api/LastPayment/' + ar.op
    if (ar.format == 'csv'):
        url = url + '?format=csv'
    #print(url)
    #headers = {'x-observatory-auth' : ar.apikey}
    res = requests.get(url, verify=False)
    print(res.status_code)
    if (ar.format == 'json' and res.status_code == 200):
        print(json.dumps(res.json(), indent=4, sort_keys=False))
    elif (ar.format == 'csv' and res.status_code == 200):
        #ftiaxnei to cvs file kai to printarei
        f = open("./LastPayment.cv",'w+')
        f.truncate(0)
        f.write(res.text)
        f.seek(0)
        #x = from_csv(f, delimiter =',')
        #x.set_style(DEFAULT)
        #print(x)
        f.close()
    #json = res.json() #in reality a python dict
    #print(json)
    #print(json['accessToken'])
    return True
