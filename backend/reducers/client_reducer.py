from reducers.base import BaseReducer
from dubna.logger import get_logger

from api.models import Client


class ClientReducer(BaseReducer):
    def __init__(self):
        self.logger = get_logger('ClientReducer')

    def update_balance(self, client: Client, change: float):
        client.balance += change
        client.save()
        self.update_status(client)

    def update_status(self, client: Client):
        if client.status in ('blocked', 'annulled'):
            return

        if not client.payments and not client.expenses:
            client.status = 'connecting'
        if (client.payments or client.expenses) and client.balance <= client.limit:
            client.status = 'active'
        if (client.payments or client.expenses) and client.balance > client.limit:
            client.status = 'stopped'

        client.save()

    def check_payment(self, client: Client):
        ...
