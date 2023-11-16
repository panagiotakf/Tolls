#!/usr/bin/env python3
import argparse
import json
import csv
import requests
import pandas as pd
from datetime import date
from pathlib import Path

def debtanalysis(ar):
    url = 'https://localhost:9103/interoperability/api/DebtAnalysis/' + ar.op  + '/' + ar.datefrom + '/' + ar.dateto
    if (ar.format == 'csv'):
        url = url + '?format=csv'
    res = requests.get(url, verify=False)
    print(res.status_code)
    if (ar.format == 'json' and res.status_code == 200):
        print(json.dumps(res.json(), indent=4, sort_keys=False))
    elif (ar.format == 'csv' and res.status_code == 200):
        f = open("./DebtsAnalysis.cv",'w+')
        f.truncate(0)
        f.write(res.text)
        f.seek(0)
        #x = pd.f.from_csv(delimiter = ',')
        #x.set_style(DEFAULT)
        #print(x)
        f.close()
    return True
