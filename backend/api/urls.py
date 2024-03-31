from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.views import ClientViewSet, ExpenseViewSet, PaymentViewSet, stats


app_name = 'api'

v1_router = DefaultRouter()
v1_router.register('clients', ClientViewSet, basename="client")
v1_router.register('payments', PaymentViewSet, basename="payment")
v1_router.register('expenses', ExpenseViewSet, basename="expense")

urlpatterns = [
    path('', include('djoser.urls')),
    path("auth/", include("djoser.urls.authtoken")),
    path('', include(v1_router.urls)),
    path('stats/', stats)
]
