#!/usr/bin/env python3
import argparse
import json
import csv
import requests
from datetime import date
from pathlib import Path

def payoff(ar):
    url = 'https://localhost:9103/interoperability/api/Payoff/' + ar.op1 + '/' + ar.op2 + '/' + ar.bank + '/' + ar.amount + '/' + ar.date
    res = requests.get(url, verify=False)
    print(res.status_code)
    return True
