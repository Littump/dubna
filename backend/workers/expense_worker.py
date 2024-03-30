import threading
import time
from datetime import datetime, timedelta

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

    def _next_payment(self, current_time, period):
        current_time = datetime.fromtimestamp(current_time)
        period_value, period_unit = int(period.split()[0]), period.split()[1]
        if period_unit == 's':
            next_time = current_time + timedelta(seconds=period_value)
        elif period_unit == 'min':
            next_time = current_time + timedelta(minutes=period_value)
        elif period_unit == 'h':
            next_time = current_time + timedelta(hours=period_value)
        elif period_unit == 'd':
            next_time = current_time + timedelta(days=period_value)
        elif period_unit == 'm':
            next_time = (current_time.replace(day=1) + timedelta(days=31)).replace(day=current_time.day)
            next_time += timedelta(days=period_value*30)
        elif period_unit == 'y':
            next_time = current_time.replace(year=current_time.year + period_value)

        return int(next_time.timestamp())

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

                date = self._next_payment(item.date, item.expense.period)
                ExpenseClient.objects.create(
                    client=item.client,
                    expense=item.expense,
                    date=date,
                )

            time.sleep(5 * 60)
