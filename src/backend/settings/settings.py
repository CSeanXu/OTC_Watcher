DEBUG = True

LOGGING_CONFIG = {
    "level": "DEBUG" if DEBUG else "INFO",
    "format": "[%(levelname)s] [%(asctime)s] [%(filename)s] [%(funcName)s] [line %(lineno)d] %(message)s"
}

PRICE_FETCH_PERIOD = 5  # 60 seconds

COINS = ["BTC", "ETH",  "BCH", "LTC"]

DIRECTIONS = ["BUY", "SELL"]

MONGO_HOST = "116.196.100.165"
MONGO_PORT = 27017


SERVER_PORT = 8000
SERVER_ADDRESS = "0.0.0.0"


