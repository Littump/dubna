from reducers.base import BaseReducer
from dubna.logger import get_logger
from datetime import datetime, timedelta

from api.models import Expense, ExpenseClient


class ExpenseReducer(metaclass=BaseReducer):

    def _next_payment(self, current_time, period):
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

    def add_cycle_expense(self, expense, client, date):
        date = self._next_payment(date, expense.period)
        ExpenseClient.objects.create(
            client=client,
            expense=expense,
            date=date,
        )

    def valid_expense(self, client):
        return client.status not in ['banned', 'annuled']
