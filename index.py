import requests
from bs4 import BeautifulSoup
import json
import pandas as pd

class Crypto:
    id_counter = 0
    def __init__(self, name, price, change_one_hour, change_one_day, change_one_week, day_volume, market_cap):
        Crypto.id_counter += 1
        self.id = Crypto.id_counter
        self.name = name
        self.price = price
        self.change_one_hour = change_one_hour
        self.change_one_day = change_one_day
        self.change_one_week = change_one_week
        self.day_volume = day_volume
        self.market_cap = market_cap

headers = {
    'User-Agent': 'Mozilla/5.0', 
    'Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0'
}

base_url = "https://www.coingecko.com/"
response = requests.get(base_url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    tables = soup.find('table').find('tbody').find_all('tr')

cryptocurrencies = []    


for table in tables: 

        try:
            name = table.find('div', {'class': 'tw-text-gray-700 dark:tw-text-moon-100 tw-font-semibold tw-text-sm tw-leading-5'}).contents[0].get_text().strip()
            price = table.find('span',{'data-price-target': 'price'}).get_text()
            change_one_hour = table.find('span',{'data-attr': 'price_change_percentage_1h'}).get_text()
            change_one_day = table.find('span',{'data-24h': 'true'}).get_text()
            change_one_week = table.find('span',{'data-attr': 'price_change_percentage_7d'}).get_text()
            day_volume = table.find_all('span',{'data-price-target': 'price'})[1].get_text()
            market_cap = table.find_all('span',{'data-price-target': 'price'})[2].get_text()
            
            crypto = Crypto(name, price, change_one_hour, change_one_day, change_one_week, day_volume, market_cap)
            cryptocurrencies.append(crypto)
        except Exception as e:
            print(f"Error occurred: {e}")

crypto_data = []
for crypto in cryptocurrencies:
    crypto_data.append({
        "id": crypto.id,
        "name": crypto.name,
        "price": crypto.price,
        "change_one_hour": crypto.change_one_hour,
        "change_one_day": crypto.change_one_day,
        "change_one_week": crypto.change_one_week,
        "day_volume": crypto.day_volume,
        "market_cap": crypto.market_cap
    })
crypto_data = crypto_data[:20]

# Sending data to JSON file
with open('crypto_data.json', 'w') as f:
    json.dump(crypto_data, f, indent=4)

