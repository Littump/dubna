from decimal import Decimal

from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator


User = get_user_model()


class Client(models.Model):
    name = models.CharField(max_length=256)
    connection_address = models.CharField(max_length=256)

    CLIENT_TYPE_CHOICE = [
        ('individual', 'физическое лицо'),
        ('legal', 'юридическое лицо'),
    ]
    client_type = models.CharField(max_length=128, choices=CLIENT_TYPE_CHOICE)
    phone = models.CharField(max_length=16)
    birthday = models.DateField(max_length=32, blank=True, null=True)

    STATUS_CHOICE = [
        ('connecting', 'подключение'),
        ('active', 'активный'),
        ('blocked', 'заблокирован'),
        ('annulled', 'рассторгнут'),
        ('stopped', 'приостановлено'),
    ]
    status = models.CharField(max_length=128,
                              choices=STATUS_CHOICE,
                              default='connecting',
                              blank=True
                              )

    balance = models.DecimalField(max_digits=10,
                                  decimal_places=2,
                                  default=0)
    limit = models.DecimalField(max_digits=10, decimal_places=2, default=500)

    last_update = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='clients'
    )

    def __str__(self) -> str:
        return f'{self.name}, {self.phone}, {self.id}'


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
        ('adjustment', 'Корректировка'),
    ]
    type = models.CharField(max_length=32, choices=TYPE_CHOICES)
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='payments'
    )
    
    def __str__(self) -> str:
        return f'{self.type}, {self.amount}, {self.date}, {self.id}'


class Expense(models.Model):
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    date = models.DateTimeField(auto_now_add=True)
    is_cycle = models.BooleanField(default=False)
    period = models.CharField(max_length=32, blank=True, default='1 m')
    TYPE_CHOICES = [
        ('videonablyudenie', 'Видеонаблюдение'),
        ('domofonia', 'Домофония'),
        ('internet', 'Интернет'),
        ('oborudovanie', 'Оборудование'),
        ('programmnoe_obespechenie', 'Подписка на программное обеспечение'),
        ('televidenie', 'Телевидение'),
        ('telefon', 'Телефонная связь'),
        ('hosting', 'Хостинг веб-ресурсов'),
        ('adjustment', 'Корректировка'),
    ]
    services = models.CharField(max_length=128, choices=TYPE_CHOICES)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='expenses'
    )
    
    def __str__(self) -> str:
        return f'{self.services}, {self.amount}, {self.date}, {self.id}'


class ExpenseClient(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE
    )
    expense = models.ForeignKey(
        Expense,
        on_delete=models.CASCADE
    )
    date = models.IntegerField()
    is_paid = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['client', 'expense', 'date'],
                name='Рецепт содержит каждый ингредиент только один раз',
            )
        ]

    def __str__(self) -> str:
        return f'{self.client}, {self.expense}, {self.date}'
