import threading
import time

from api.models import ExpenseClient
from reducers import Reducers


class ExpenseWorker(threading.Thread):
    def init(self):
        super(ExpenseWorker, self).init()
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
                item.is_paid = True
                self.reducers.client_reducer.update_balance(item.client, -item.expense.amount)
                item.save()

                self.reducers.client_reducer.update_status(item.client)
                self.reducers.expense_reducer.add_cycle_expense(item.expense, item.client)

            time.sleep(5 * 60)
