from __future__ import division

import time
import pymongo

from settings import MONGO_HOST, MONGO_PORT

QUOTATION_BASE = "quotation_{}"


class Mongodb(object):
    def __init__(self):
        client = pymongo.MongoClient(host=MONGO_HOST, port=MONGO_PORT)

        self.db = client.get_database("currency_watcher")

    @property
    def collection(self):
        return self.collection

    @collection.getter
    def collection(self):
        return self.collection

    @collection.setter
    def collection(self, value):
        return

    def get_collection(self, collection_name):
        return self.db.get_collection(collection_name)

    def get_quotation_data(self, coin):
        def _get_price(record):
            return record["data"]["advertisements"][0].get("price")

        collection_name = QUOTATION_BASE.format(coin.lower())

        collection = self.get_collection(collection_name)

        cursor = collection.find({"data.advertisements": {"$exists": True}}, {"_id": False}).limit(100)

        r = [_get_price(x) for x in cursor]

        return r

    def insert_quotation(self, coin, data, with_time=False):
        if with_time:
            data["time"] = time.time() // 60 * 60
        collection = self.get_collection(QUOTATION_BASE.format(coin.lower()))
        r = collection.insert(data)
        return r
