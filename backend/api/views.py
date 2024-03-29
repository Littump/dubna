from copy import deepcopy

from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework import status


from api.serializers import ClientSerializer, DepartmentSerializer, PaymentSerializer, ExpenseSerializer
from reducers.api_reducer import ApiReducer
from dubna.logger import get_logger

from api.models import Client, Department, Payment, Expense
from reducers import Reducers
# class ApiViewSet(ViewSet):

#     api_reducer = ApiReducer()
#     logger = get_logger('ApiViewSet')

#     # @swagger_auto_schema(
#     #     request_body=,
#     #     responses={200: ...}
#     # )
#     @action(methods=['POST'], detail=False)
#     def base(self, request):
#         self.logger.info(message='...', request=request.data)
#         serializer = serializers....(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         query = serializer.validated_data

#         serializer = self.api_reducer.base(query)
#         serializer.is_valid(raise_exception=True)
#         self.logger.info(message='...', data=serializer.data)

#         if not serializer:
#             return Response(status=HTTP_404_NOT_FOUND)

#         return Response(data=serializer.data, status=HTTP_200_OK)

class CustomViewSet(ModelViewSet, Reducers):
    ...


class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class PaymentViewSet(CustomViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    http_method_names = ['get', 'post', 'delete']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.client_reducer.update_balance(instance.client, -instance.amount)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExpenseViewSet(CustomViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    http_method_names = ['get', 'post', 'delete']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.client_reducer.update_balance(instance.client, instance.amount)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
