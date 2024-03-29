from rest_framework.serializers import ModelSerializer
from api.models import Client, Department


class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
