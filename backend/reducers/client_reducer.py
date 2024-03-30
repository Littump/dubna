from reducers.base import BaseReducer
from dubna.logger import get_logger

from api.models import Client


class ClientReducer(metaclass=BaseReducer):
    def __init__(self):
        self.logger = get_logger('ClientReducer')

    def update_balance(self, client: Client, change: float):
        client.balance += change
        client.save()
        self.update_status(client)

    def update_status(self, client: Client):
        if client.status == 'annulled':
            return

        if not client.payments and not client.expenses:
            client.status = 'connecting'
        if (client.payments or client.expenses) and client.balance >= -client.limit:
            client.status = 'active'
        if (client.payments or client.expenses) and client.balance < -client.limit and client.status == 'active':
            client.status = 'stopped'
        if (client.payments or client.expenses) and client.balance < -client.limit and client.status == 'stopped':
            client.status = 'banned'

        client.save()
