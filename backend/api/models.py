from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from decimal import Decimal

User = get_user_model()


class Service(models.Model):
    TYPE_CHOICES = [
        ('videonablyudenie', 'Видеонаблюдение'),
        ('domofonia', 'Домофония'),
        ('internet', 'Интернет'),
        ('oborudovanie', 'Оборудование'),
        ('programmnoe_obespechenie', 'Подписка на программное обеспечение'),
        ('televidenie', 'Телевидение'),
        ('telefon', 'Телефонная связь'),
        ('hosting', 'Хостинг веб-ресурсов'),
    ]
    type = models.CharField(max_length=32)


class Client(models.Model):
    first_name = models.CharField(max_length=32, blank=True, default='')
    last_name = models.CharField(max_length=32, blank=True, default='')
    patronymic = models.CharField(max_length=64)

    phone = models.CharField(max_length=16)
    birthday = models.DateField(max_length=32)
    connection_address = models.CharField(max_length=16)

    CLIENT_TYPE_CHOICE = [
        ('individuall', 'физическое лицо'),
        ('legal', 'юридическое лицо'),
    ]
    client_type = models.CharField(max_length=128, choices=CLIENT_TYPE_CHOICE)

    STATUS_CHOICE = [
        ('connecting', 'подключение'),
        ('active', 'активный'),
        ('blocked', 'заблокирован'),
        ('annulled', 'рассторгнут'),
        ('stopped', 'приостановлено'),
    ]
    status = models.CharField(max_length=128, choices=STATUS_CHOICE)

    balance = models.DecimalField(max_digits=10,
                                  decimal_places=2,
                                  default=0,
                                  validators=[MinValueValidator(Decimal('0.00'))]
                                  )
    limit = models.DecimalField(max_digits=10, decimal_places=2, default=30000)

    department = models.CharField(max_length=128)

    last_update = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='clients'
    )

    def clean_fields(self, exclude=None):
        if self.client_type == 'individuall':
            exclude.add('department')
        if self.client_type == 'legal':
            exclude.add('birthday')



class Payment(models.Model):
    TYPE_CHOICES = [
        ('qr', 'QR-код'),
        ('auto', 'Автоплатеж'),
        ('bank', 'Банковский платеж'),
        ('cash', 'Наличными'),
        ('card', 'Картой'),
        ('post', 'Почта России'),
        ('Sber', 'Сбер-онлайн'),
        ('SBP', 'СПБ'),
    ]
    type = models.CharField(max_length=32, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='payments'
    )


class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    is_cycle = models.BooleanField(default=False)
    period = models.CharField(max_length=32, blank=True, default='1 m')
    services = models.ForeignKey(
        Service,
        on_delete=models.SET_DEFAULT,
        default='Услуга',
        related_name='expenses',
    )
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='expenses'
    )


class ExpenseClient(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE
    )
    expense = models.ForeignKey(
        Expense,
        on_delete=models.CASCADE
    )
    date = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)

    class Meta:
        unique_together = ('client', 'expense', 'is_paid')
