import json
import tldextract



import os
import multiprocessing 
import sys
import datetime
from multiprocessing import Pool
import requests
import json
import redis
from usp.tree import sitemap_tree_for_homepage
import tldextract


def dump_jsonl(data, output_path, append=False):
    """
    Write list of objects to a JSON lines file.
    """
    mode = 'a+' if append else 'w'
    with open(output_path, mode, encoding='utf-8') as f:
        for line in data:
            json_record = json.dumps(line, ensure_ascii=False)
            f.write(json_record + '\n')
    print('Wrote {} records to {}'.format(len(data), output_path)) 



client0 = redis.Redis(host = '43.251.253.107', port=1500,db=3)



alldomains = ['Charcoal.com.pk','Blueshoppy.com','Brandsego.com','Brandsriver.com','Brandspopper.com','Brandsxpress.com','Breakout.com.pk','Chenone.com','Diners.com.pk','Exportleftovers.com','Leisureclub.pk','Outfitters.com.pk','Thecambridgeshop.com','brandsroots.com','']



numberOfThreads=len(alldomains)



def basic_func(domain):
    try:
        run=True
        while(run):         #### important to  understand
            try:
                randomurl=client0.srandmember(domain)           #### important to  understand
                if(randomurl):  
                    link=randomurl.decode("utf-8")
                    urlForRedisDelete=randomurl.decode("utf-8")
        
                    if (link.find('/products/') != -1) or (link.find('/collections/') != -1):
                        try:  
                            link = link.split("?")
                            link = link[0]+'.json'
                            response = requests.get(link)
                            json_data = json.loads(response.text)
                            try:
                                del json_data['product']['body_html'] 
                            except:
                                print("body html not found")                          
                            dump_jsonl([json_data], "/home/et/Documents/Ahsan/mudassir/data/"+domain+'.jsonl',append=True)
                            respon=client0.srem(domain,urlForRedisDelete)                #### important to  understand
                            print(str(respon)+"================================================")

                        except Exception as e:
                            if(str(e)=="Expecting value: line 1 column 1 (char 0)"):
                                print("--------- this product does not exist ----------")
                                print(urlForRedisDelete)
                                client0.srem(domain,urlForRedisDelete)                #### important to  understand
                                print("---------  removing product from redis ----------")

                            print("around json write : "+str(e))    

                else:    
                    print("finished all urls Download from : "+domain)
                    break            #### important to  understand  breaking the loop if the url is not fouind in redis meaning redis has not more entries for this domain matlab khatam ho gaya
                                





            except Exception as e:
                print("around while: "+str(e))


     

    except Exception as e:
        print("around thread : "+str(e)) 

pool = Pool(processes=int(numberOfThreads)) 
# pool = Pool(processes=) 
pool.map(basic_func, alldomains)
pool.close()       


