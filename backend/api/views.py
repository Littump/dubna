from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from api.serializers import ClientSerializer, PaymentSerializer, ExpenseSerializer
from dubna.logger import get_logger

from api.models import Client, Payment, Expense
from reducers import Reducers


class CustomModelViewSet(ModelViewSet):
    reducers = Reducers()
    permission_classes = [IsAuthenticated]


class ClientViewSet(CustomModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['get'], detail=True)
    def payments(self, request, pk=None):
        payments = Payment.objects.filter(client=self.get_object())
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def expenses(self, request, pk=None):
        expenses = Expense.objects.filter(client=self.get_object())
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)


class PaymentViewSet(CustomModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    http_method_names = ['get', 'post', 'delete']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.reducers.client_reducer.update_balance(instance.client, -instance.amount)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExpenseViewSet(CustomModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    http_method_names = ['get', 'post', 'delete']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client = get_object_or_404(Client, pk=serializer.validated_data['client'].id)
        if not self.reducers.expense_reducer.valid_expense(client):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.reducers.client_reducer.update_balance(instance.client, instance.amount)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
