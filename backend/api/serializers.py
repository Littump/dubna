from rest_framework.serializers import ModelSerializer
from api.models import Client, Payment, Expense, ExpenseClient
from reducers import Reducers


class CustomModelSerializer(ModelSerializer):
    reducers = Reducers()


class ClientSerializer(CustomModelSerializer):
    class Meta:
        model = Client
        exclude = ['user']


class PaymentSerializer(CustomModelSerializer):
    def save(self, **kwargs):
        self.reducers.client_reducer.update_balance(
            self.validated_data['client'],
            self.validated_data['amount'],
        )
        return super().save(**kwargs)

    class Meta:
        model = Payment
        fields = "__all__"


class ExpenseSerializer(CustomModelSerializer):
    def save(self, **kwargs):
        self.reducers.client_reducer.update_balance(
            self.validated_data['client'],
            -self.validated_data['amount'],
        )
        ExpenseClient.objects.create(
            client=self.validated_data['client'],
            expense=self.validated_data['expense'],
            is_paid=True,
        )
        return super().save(**kwargs)

    class Meta:
        model = Expense
        fields = "__all__"
