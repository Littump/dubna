from api import serializers
from reducers.base import BaseReducer
from reducers.price import PriceReducer
from valuation.logger import get_logger


class ApiReducer(metaclass=BaseReducer):

    def __init__(self):
        self.price_reducer = PriceReducer()
        self.logger = get_logger('ApiReducer')

    def price(self, data):
        data = self.price_reducer.prepare_data_get_price(data)
        self.logger.info(message='got data for calculating price', data=data)

        price = self.price_reducer.get_price(data)
        self.logger.info(message='calculated price', price=price)

        if not price:
            return None

        return serializers.ApiPriceResponseSerializer(data={'price': int(price)})
