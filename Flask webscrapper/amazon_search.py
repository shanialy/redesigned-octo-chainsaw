# -*- coding: utf-8 -*-
"""
Created on Sat Apr 24 12:25:41 2021

@author: win10
"""

from autoscraper import AutoScraper
# url="https://www.ishopping.pk/mens-store/men-s-clothing/western-clothing/t-shirts.html"

# wanted_list=["Khas Store Loungwewear For Men (LW-027)","PKR 1,609"]
url="https://www.ishopping.pk/mens-store/men-s-clothing/western-clothing/t-shirts.html"

item=["https://adnjxlogdq.cloudimg.io/v7/https://www.ishopping.pk/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/w/o/wop-polo-t-shirts-half-sleeve-xl-size-_pack-of-2__2.jpg","WOP Polo T-Shirts Half Sleeve XL Size (Pack of 2)"]

scraper=AutoScraper()
result=scraper.build(url,item)
print(result)
scraper.save('ishopping') 
# print(result,scraper.get_result_similar('https://www.ishopping.pk/catalogsearch/result/?q=tshirt',grouped=True))
# # print(scraper.get_result_similar(url,grouped=True))
# scraper.set_rule_aliases({'rule_hpil':'Title','rule_lw8s':'Price'})
# scraper.keep_rules(['rule_hpil','rule_lw8s'])
# scraper.save('ishopping')



