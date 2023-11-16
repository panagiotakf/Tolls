import requests
import json
import numpy as np
import pandas as pd
import mysql.connector

mydb=mysql.connector.connect(host="localhost",user="root",passwd="mamaki",database="base1")
mycursor = mydb.cursor()
sql_query="""INSERT INTO Provider (providerId,providerAbbr)
Values ("aodos","AO"),("gefyra","GF"),("egnatia","EG"),("kentriki_odos","KO"),("moreas","MR"),("nea_odos","NE"),("olympia_odos","OO");"""
mycursor.execute(sql_query)
mydb.commit()
print(mycursor.rowcount, "record inserted.")
print("Hi love")

