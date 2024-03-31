from reducers.base import BaseReducer
from dubna.logger import get_logger
from api.models import Client


class ClientReducer(metaclass=BaseReducer):
    def __init__(self):
        self.logger = get_logger('ClientReducer')

    def update_balance(self, client: Client, change: float):
        self.logger.info(message='Change balance',
                         client_id=client.id,
                         change=change)
        client.balance += change
        client.save()
        self.update_status(client)

    def update_status(self, client: Client):
        prev_status = client.status
        new_status = None

        if client.status == 'annulled':
            return

        if (
            (client.payments or client.expenses) and
            client.balance < -client.limit and
            client.status == 'stopped'
        ):
            client.status = 'banned'
            new_status = 'banned'

        elif not client.payments and not client.expenses:
            client.status = 'connecting'
            new_status = 'connecting'

        elif (
            (client.payments or client.expenses) and
                client.balance >= -client.limit
        ):
            client.status = 'active'
            new_status = 'active'

        elif (
            (client.payments or client.expenses) and
            client.balance < -client.limit and
            (client.status in ('active', 'connecting'))
        ):

            client.status = 'stopped'
            new_status = 'stopped'

        self.logger.info(message='Change client status',
                         client_id=client.id,
                         prev_status=prev_status,
                         new_status=new_status)
        client.save()
