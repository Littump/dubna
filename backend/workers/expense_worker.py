import threading
import time
from datetime import datetime

from api.models import ExpenseClient, Expense
from reducers import Reducers
from reducers.base import BaseReducer
from dubna.logger import get_logger


class ExpenseWorker(threading.Thread, metaclass=BaseReducer):
    def __init__(self):
        super().__init__()
        self.logger = get_logger('ExpenseWorker')
        self.reducers = Reducers()
        self.start_time = time.time()
        self.lock = threading.Lock()
        self.running = True
        self.start()

    def run(self):
        while self.running:
            payments = ExpenseClient.objects.filter(
                is_paid=False,
                date__lt=int(time.time()),
            )
            for item in payments:
                self.logger.info(message='Pay expense',
                                 expense_id=item.expense.id,
                                 client_id=item.client.id)
                if not self.reducers.expense_reducer.valid_expense(
                    item.client
                ):
                    continue
                item.is_paid = True

                Expense.objects.create(
                    amount=item.expense.amount,
                    client=item.client,
                    services=item.expense.services,
                    date=item.date,
                )

                self.reducers.client_reducer.update_balance(
                    client=item.client,
                    change=-item.expense.amount,
                )
                item.save()

                self.reducers.expense_reducer.add_cycle_expense(
                    expense=item.expense,
                    client=item.client,
                    date=datetime.fromtimestamp(item.date)
                )

            time.sleep(5)
