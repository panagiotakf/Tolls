import requests
import json
import numpy as np
import pandas as pd
import mysql.connector
import string
import random
import csv

mydb=mysql.connector.connect(host="localhost",user="root",passwd="mamaki",database="base1")
mycursor = mydb.cursor()
years,months,days = range(2020,2022,1), range(1,13,1), range(1,32,1)
hours,minutes,seconds = range(0,24,1), range(0,60,1), range(0,60,1)

with open(r'C:\Users\user\Documents\Tl_Project\excel_data\sampledata01\passes.csv') as data:
    data=csv.reader(data,delimiter=';')
    x=1
    for row in data:
        if(x!=1):
            passId=row[0]
            timestamps=row[1]
            day=''
            n=0
            for i in timestamps:
                if i=="/" :
                    n=n+1;
                    break;
                else:
                    day=day+i
                    n=n+1
            if n<2:
                day='0'+day
            month=''
            for i in timestamps[n:]:
                if i=="/" :
                    n=n+1;
                    break;
                else:
                    month=month+i
                    n=n+1
            if len(month)<2:
                month='0'+month
            year=''
            for i in timestamps[n:]:
                if i==" " :
                    n=n+1;
                    break;
                else:
                    year=year+i
                    n=n+1
            

            hour,minute = timestamps[n:n+2], timestamps[n+3:n+5]
            #second=np.random.choice(seconds)
            if day=="31" and month=="03" and hour=="03":
                hour="04"
            timestamps=str(year)+'-'+str(month)+'-'+str(day)+' '+str(hour)+':'+str(minute)+':'+'00'#str(second)
            stationRef=row[2]
            vehicleRef=row[3]
            charge=row[4]
            if day=="31" and month=="03" and hour=="03":
                hour="04"

            sql_query="""INSERT INTO Pass(passId,stationRef,vehicleRef,timestamps,charge) Values ('{}','{}','{}','{}','{}');""".format(passId,stationRef,vehicleRef,timestamps,charge)
            mycursor.execute(sql_query)
            mydb.commit()

        else: x=0



