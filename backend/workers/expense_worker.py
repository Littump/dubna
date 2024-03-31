import threading
import time

from api.models import ExpenseClient, Expense
from reducers import Reducers
from reducers.base import BaseReducer

from datetime import datetime


class ExpenseWorker(threading.Thread, metaclass=BaseReducer):
    def __init__(self):
        super().__init__()
        self.reducers = Reducers()
        self.start_time = time.time()
        self.lock = threading.Lock()
        self.running = True
        print('PRED START')
        self.start()

    def run(self):
        while self.running:
            payments = ExpenseClient.objects.filter(
                is_paid=False,
                date__lt=int(time.time()),
            )
            for item in payments:
                if not self.reducers.expense_reducer.valid_expense(item.client):
                    continue
                item.is_paid = True

                Expense.objects.create(
                    amount=item.expense.amount,
                    client=item.client,
                    services=item.expense.services,
                    date=item.date,
                )

                self.reducers.client_reducer.update_balance(item.client, -item.expense.amount)
                item.save()

                self.reducers.expense_reducer.add_cycle_expense(item.expense, item.client, datetime.fromtimestamp(item.date))

            time.sleep(5)
