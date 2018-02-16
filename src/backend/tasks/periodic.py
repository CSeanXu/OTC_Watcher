import json
import logging
from urllib.parse import urlencode
from functools import partial
from tornado.httpclient import AsyncHTTPClient, HTTPRequest
from tornado.ioloop import PeriodicCallback

from db.mongodb import Mongodb
from settings import PRICE_FETCH_PERIOD

logger = logging.getLogger(__name__)


async def fetch_price_cb(coin, direction):
    client = AsyncHTTPClient()
    url = "https://www.cola-otc.com/v1/advertisement/list"

    ua = "CoinCola/2.4.1 (iPhone9,1; iOS 11.0.3) UUID/F410574E-D8B8-4FF4-A55F-ACA52C0D29A4"

    headers = {
        'Host': 'www.cola-otc.com',
        'Accept': '*/*',
        'User-Agent': 'CoinCola/2.4.1 (iPhone9,1; iOS 11.0.3) UUID/F410574E-D8B8-4FF4-A55F-ACA52C0D29A4',
        'Accept-Language': 'zh',
        'Authorization': 'Bearer',
    }

    data = {
        'country_code': 'CN',
        'crypto_currency': coin.upper(),
        'limit': 100,
        'offset': 0,
        'sort_order': 'GENERAL',
        'type': direction.upper(),
    }

    body = urlencode(data)
    request = HTTPRequest(url, method="POST", body=body, headers=headers, user_agent=ua)
    response = await client.fetch(request, raise_error=False)
    if response.error:
        logger.error(response.error)
        return False
    else:
        j = json.loads(response.body)
        r = Mongodb().insert_quotation(coin, j, with_time=True)
        logger.info(r)
        return True


class FetchPrice:
    def __init__(self, coins, directions):
        self.tasks = [PeriodicCallback(partial(fetch_price_cb, coin, direction), PRICE_FETCH_PERIOD * 1000)
                      for coin in coins for direction in directions]

    def start(self):
        for task in self.tasks:
            task.start()
