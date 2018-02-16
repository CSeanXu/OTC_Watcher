import logging

from tornado.ioloop import IOLoop
from tornado.web import Application

from handlers.Quotation import QuotationHandler
from settings import SERVER_PORT, SERVER_ADDRESS, LOGGING_CONFIG, COINS, DIRECTIONS
from tasks.periodic import FetchPrice

logging.basicConfig(**LOGGING_CONFIG)
logger = logging.getLogger(__name__)


def get_application():
    handlers = [
        ("/api/quotation/([^/]*)", QuotationHandler)
    ]
    return Application(handlers=handlers, debug=True)


def start_server():
    app = get_application()
    app.listen(SERVER_PORT, SERVER_ADDRESS)
    logger.info("Server Started, Listening On: [{}:{}]".format(SERVER_ADDRESS, SERVER_PORT))


def main():
    loop = IOLoop.instance()
    start_server()
    FetchPrice(COINS, DIRECTIONS).start()
    # loop.run_sync(partial(notify_slack, "hi, sean xu"))
    loop.start()


if __name__ == '__main__':
    main()
