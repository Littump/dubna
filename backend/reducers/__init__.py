from reducers.base import BaseReducer
from reducers.client_reducer import ClientReducer
from reducers.expense_reducer import ExpenseReducer


class Reducers(metaclass=BaseReducer):
    client_reducer = ClientReducer()
    expense_reducer = ExpenseReducer()
