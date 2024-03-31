from datetime import datetime

from rest_framework.serializers import ModelSerializer

from api.models import Client, Payment, Expense, ExpenseClient
from reducers import Reducers
from dubna.logger import get_logger


class CustomModelSerializer(ModelSerializer):
    reducers = Reducers()


class ClientSerializer(CustomModelSerializer):
    def validate_birthday(self, value):
        if not value:
            return value

        now = datetime.now().date()
        now_18year = now.replace(year=now.year - 18)
        if value > now_18year:
            raise ValueError('Client must be at least 18 years old')

        return value

    class Meta:
        model = Client
        exclude = ['user']


class PaymentSerializer(CustomModelSerializer):
    logger = get_logger('PaymentSerializer')

    def save(self, **kwargs):
        self.logger.info(message='Create payment',
                         data=self.validated_data)
        self.reducers.client_reducer.update_balance(
            self.validated_data['client'],
            self.validated_data['amount'],
        )
        return super().save(**kwargs)

    class Meta:
        model = Payment
        fields = "__all__"


class ExpenseSerializer(CustomModelSerializer):
    logger = get_logger('ExpenseSerializer')

    def save(self, **kwargs):
        self.logger.info(message='Create expense',
                         data=self.validated_data)
        self.reducers.client_reducer.update_balance(
            self.validated_data['client'],
            -self.validated_data['amount'],
        )
        instance = super().save(**kwargs)
        if self.validated_data['is_cycle']:
            self.reducers.expense_reducer.add_cycle_expense(
                instance,
                self.validated_data['client'],
                instance.dat
            )
        ExpenseClient.objects.create(
            client=self.validated_data['client'],
            expense=instance,
            is_paid=True,
            date=int(instance.date.timestamp()),
        )
        return instance

    class Meta:
        model = Expense
        fields = "__all__"
