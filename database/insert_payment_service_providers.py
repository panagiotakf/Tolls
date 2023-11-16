import requests
import json
import numpy as np
import pandas as pd
import mysql.connector

mydb=mysql.connector.connect(host="localhost",user="root",passwd="mamaki",database="base1")
mycursor = mydb.cursor()

sql_query="""INSERT INTO Payment_Service_Providers 
Values ('ethniki'),('pireos'),('eurobank'),('alphabank');"""
mycursor.execute(sql_query)
mydb.commit()
print(mycursor.rowcount, "record inserted.")
print("Hi love")
