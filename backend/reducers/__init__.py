from reducers.client_reducer import ClientReducer
from reducers.base import BaseReducer


class Reducers(BaseReducer):
    def __init__(self):
        self.client_reducer = ClientReducer()
