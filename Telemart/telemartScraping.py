from seleniumwire import webdriver  # Import from seleniumwire

from seleniumwire.utils import decode

from webdriver_manager.chrome import ChromeDriverManager
import time

from selenium.webdriver.chrome.options import Options
import json

options = Options()
from selenium import webdriver
# chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless')
# chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument('--disable-dev-shm-usage')
# driver = webdriver.Chrome('chromedriver',chrome_options=chrome_options)
# options.add_argument("window-size=1400,600")
# options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
from fake_useragent import UserAgent
ua = UserAgent()
user_agent = ua.random
print(user_agent)
options.add_argument(f'user-agent={user_agent}')
driver = webdriver.Chrome(ChromeDriverManager().install(),options=options)

driver.get('https://telemart.pk/men-s-fashion/clothing/western-wear/t-shirts.html')

request = driver.wait_for_request('/api/filter', timeout=100)

# first first page product using direct slenium
body = decode(request.response.body, request.response.headers.get('Content-Encoding', 'identity'))
firstPageProducts = json.loads(body)
print(json.dumps(firstPageProducts, indent=4, sort_keys=True))


# get cookie and crf token for next pages headers to be used in simple request library method
cookie=""
xsrfToken=""
for req in driver.requests:
    if "/api/filter" in req.url:
        cookie= req.headers['cookie'] 
#         print('\n')
        xsrfToken=req.headers['x-xsrf-token']
        break
print(cookie,xsrfToken)



#     get the category 
import requests

headers = {
    'authority': 'telemart.pk',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'referer': 'https://telemart.pk/men-s-fashion/clothing/western-wear/t-shirts.html?page=3',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}

response2 = requests.get('https://telemart.pk/api/category/men-s-fashion/clothing/western-wear/t-shirts.html', headers=headers)
#  is url me sitemap wale link ka half part dal do   https://telemart.pk/api/category/>--- men-s-fashion/clothing/western-wear/t-shirts.html

categoryId=response2.json()['categories'][0]['id']


#use category id cookie and xsrfToken in the request headers  for next pages