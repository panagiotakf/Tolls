import subprocess
import os
from pathlib import Path
import json
import re


def healthcheck():
    output = subprocess.check_output(["se2150","healthcheck"],universal_newlines=True)
    output = output.replace("\'", "\"")
    f = re.split("\n", output)
    f_obj = json.loads(f[1])
    if(f_obj['status']=='OK'): print("healthcheck: Pass")

healthcheck();

def passes_per_station():
    output = subprocess.check_output(["se2150","passesperstation", "--format", "json", "--station", "NE02", "--datefrom", "20190101", "--dateto", "20190131"], universal_newlines=True)
    #command = ["se2150","passesperstation", "--format", "json", "--station", "NE02", "--datefrom", "20190101", "--dateto", "20190202"]
    #output = output.replace("\'", "\"")
    f = re.split("200\n", output)
    #print(f[1])
    f_obj = json.loads(f[1])
    if(f_obj['NumberOfPasses']==5): print("passes_per_station : Pass")

def passes_cost():
    output = subprocess.check_output(["se2150","passescost", "--format", "json", "--op1", "aodos", "--op2", "gefyra", "--datefrom", "20190101", "--dateto", "20190202"], universal_newlines=True)
    #command = ["se2150","passesperstation", "--format", "json", "--station", "NE02", "--datefrom", "20190101", "--dateto", "20190202"]
    #output = output.replace("\'", "\"")
    f = re.split("200\n", output)
    #print(f[1])
    f_obj = json.loads(f[1])
    if(f_obj['PassesCost']== 16.8): print("passes_cost : Pass")

def charges_by():
    output = subprocess.check_output(["se2150","chargesby", "--format", "json", "--op", "aodos", "--datefrom", "20190101", "--dateto", "20190202"], universal_newlines=True)
    #command = ["se2150","passesperstation", "--format", "json", "--station", "NE02", "--datefrom", "20190101", "--dateto", "20190202"]
    #output = output.replace("\'", "\"")
    f = re.split("200\n", output)
    #print(f[1])
    f_obj = json.loads(f[1])
    if(f_obj['op1_ID']== "aodos"): print("charges_by: Pass")

def debt_analysis():
    output = subprocess.check_output(["se2150","debtanalysis", "--format", "json", "--op", "aodos", "--datefrom", "20190101", "--dateto", "20190202"], universal_newlines=True)
    #command = ["se2150","passesperstation", "--format", "json", "--station", "NE02", "--datefrom", "20190101", "--dateto", "20190202"]
    #output = output.replace("\'", "\"")
    f = re.split("200\n", output)
    #print(f[1])
    f_obj = json.loads(f[1])
    if(f_obj['op1_ID']== "aodos"): print("debt_analysis: Pass")

def debts():
    output = subprocess.check_output(["se2150","debts", "--format", "json", "--op1", "aodos", "--op2", "gefyra", "--datefrom", "20190101", "--dateto", "20190202"], universal_newlines=True)
    #command = ["se2150","passesperstation", "--format", "json", "--station", "NE02", "--datefrom", "20190101", "--dateto", "20190202"]
    #output = output.replace("\'", "\"")
    f = re.split("200\n", output)
    #print(f[1])
    f_obj = json.loads(f[1])
    if(f_obj['Debt']== 16.8): print("debts : Pass")

def passes_analysis():
    output = subprocess.check_output(["se2150","passesanalysis", "--format", "json", "--op1", "aodos", "--op2", "gefyra", "--datefrom", "20190101", "--dateto", "20190202"], universal_newlines=True)

    f = re.split("200\n", output)
    #print(f[1])
    f_obj = json.loads(f[1])
    if(f_obj['NumberOfPasses']== 6): print("passes_analysis : Pass")

passes_per_station()
passes_cost()
charges_by()
debt_analysis()
debts()
passes_analysis()
