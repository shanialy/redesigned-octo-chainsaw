from usp.tree import sitemap_tree_for_homepage
import redis
tree = sitemap_tree_for_homepage("https://www.ishopping.pk/")
urls = [page.url for page in tree.all_pages()]
print(len(urls), urls[0:9])
client = redis.Redis(host = '43.251.253.107', port=1500,db=2)
for item in urls:
  client.sadd('ishopping',item)
