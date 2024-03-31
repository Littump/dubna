import csv

from api.models import Client, Expense, Payment
from api.serializers import (ClientSerializer, ExpenseSerializer,
                             PaymentSerializer)
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from dubna.logger import get_logger
from reducers import Reducers
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class CustomModelViewSet(ModelViewSet):
    reducers = Reducers()
    permission_classes = [IsAuthenticated]


class ClientViewSet(CustomModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    logger = get_logger('ClientViewSet')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['get'], detail=True)
    def payments(self, request, pk=None):
        self.logger.info(message='Get payments', client_id=pk)
        payments = Payment.objects.filter(client=self.get_object())
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def expenses(self, request, pk=None):
        self.logger.info(message='Get expense', client_id=pk)
        expenses = Expense.objects.filter(client=self.get_object())
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def stats(self, request):
        clients = Client.objects.all()
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="clients.csv"'
        writer = csv.writer(response)
        writer.writerow(['Имя', 'Адрес',
                         'Тип', 'Телефон', 'День рождения',
                         'Статус', 'Баланс', 'Лимит'])

        for client in clients:
            writer.writerow([client.name, client.connection_address,
                            client.client_type, client.phone, client.birthday,
                            client.status, client.balance, client.limit])

        return response


class PaymentViewSet(CustomModelViewSet):

    logger = get_logger('PaymentViewSet')

    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    http_method_names = ['get', 'post', 'delete']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.logger.info(message='Delete payment',
                         expense_id=instance.id)
        self.reducers.client_reducer.update_balance(
            instance.client,
            -instance.amount
        )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExpenseViewSet(CustomModelViewSet):

    logger = get_logger('ExpenseViewSet')

    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    http_method_names = ['get', 'post', 'delete']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client = get_object_or_404(Client,
                                   pk=serializer.validated_data['client'].id)
        if not self.reducers.expense_reducer.valid_expense(client):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.logger.info(message='Delete expense',
                         expense_id=instance.id)
        self.reducers.client_reducer.update_balance(instance.client,
                                                    instance.amount)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


# @swagger_auto_schema(method='post', request_body=StatsSerializer)

