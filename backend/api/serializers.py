from rest_framework.serializers import ModelSerializer
from api.models import Client, Department, Payment, Expense

from reducers import Reducers


class CustomModelSerializer(ModelSerializer, Reducers):
    ...


class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class PaymentSerializer(CustomModelSerializer):
    def save(self, **kwargs):
        self.client_reducer.update_balance(
            self.validated_data['client'],
            self.validated_data['amount']
        )
        return super().save(**kwargs)

    class Meta:
        model = Payment
        fields = "__all__"


class ExpenseSerializer(CustomModelSerializer):
    def save(self, **kwargs):
        self.client_reducer.update_balance(
            self.validated_data['client'],
            -self.validated_data['amount']
        )
        return super().save(**kwargs)

    class Meta:
        model = Expense
        fields = "__all__"
