
import requests
import json
import redis

alldomains = ['Blueshoppy.com','Brandsego.com','Brandsriver.com','Brandspopper.com','Brandsxpress.com','Breakout.com.pk','Chenone.com','Diners.com.pk','Exportleftovers.com','Leisureclub.pk','Outfitters.com.pk','Thecambridgeshop.com','brandsroots.com','']

master = redis.Redis(host = '43.251.253.107', port=1500,db=0)
client3 = redis.Redis(host = '43.251.253.107', port=1500,db=3)
try:
    for domain in alldomains:
        allurls=master.smembers(domain)  
        listcols=[]
        for key in allurls:

            client3.sadd(domain,key.decode("utf-8"))
  
except Exception as e:
    print(e) 
