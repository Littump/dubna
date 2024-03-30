from reducers.base import BaseReducer
from reducers.client_reducer import ClientReducer


class Reducers(metaclass=BaseReducer):
    client_reducer = ClientReducer()
