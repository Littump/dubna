from copy import deepcopy

from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND

from api import serializers
from reducers.api_reducer import ApiReducer
from ....logger import get_logger


class ApiViewSet(ViewSet):

    api_reducer = ApiReducer()
    logger = get_logger('ApiViewSet')

    @swagger_auto_schema(
        request_body=...,
        responses={200: ...}
    )
    @action(methods=['POST'], detail=False)
    def base(self, request):
        self.logger.info(message='...', request=request.data)
        serializer = serializers....(data=request.data)
        serializer.is_valid(raise_exception=True)
        query = serializer.validated_data

        serializer = self.api_reducer.base(query)
        serializer.is_valid(raise_exception=True)
        self.logger.info(message='...', data=serializer.data)

        if not serializer:
            return Response(status=HTTP_404_NOT_FOUND)

        return Response(data=serializer.data, status=HTTP_200_OK)
