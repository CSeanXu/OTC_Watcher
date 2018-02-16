import logging
from tornado.web import RequestHandler

from db.mongodb import Mongodb
from utils.common import format_response
from utils.graph import show_plt

logger = logging.getLogger(__name__)


class QuotationHandler(RequestHandler):
    def initialize(self):
        self.__setattr__("mongo", Mongodb())

    def data_received(self, chunk):
        pass

    async def get(self, coin, *args, **kwargs):
        logger.info("Got request")
        data = getattr(self, "mongo").get_quotation_data(coin)
        # show_plt(data)
        self.write(format_response(True, data))
        self.finish()
