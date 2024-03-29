from django.db import models
from django.contrib.auth.models import AbstractUser


class Department(models.Model):
    name = models.CharField(max_length=128)


class Payment(models.Model):
    TYPE_CHOICES = [
        ('qr', 'QR-код'),
        ('auto', 'Автоплатеж'),
        ('bank', 'Банковский платеж'),
        ('cash', 'Наличными'),
        ('card', 'Картой'),
        ('post', 'Почта России'),
        ('Sber', 'Сбер-онлайн'),
        ('SBP', 'СПБ')
    ]

    type = models.CharField(max_length=32, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='payments'
    )


class Expense(models.Model):
    EXPENSE_TYPE_CHOICES = [
        ('videonablyudenie', 'Видеонаблюдение'),
        ('domofonia', 'Домофония'),
        ('internet', 'Интернет'),
        ('oborudovanie', 'Оборудование'),
        ('programmnoe_obespechenie', 'Подписка на программное обеспечение'),
        ('televidenie', 'Телевидение'),
        ('telefon', 'Телефонная связь'),
        ('hosting', 'Хостинг веб-ресурсов'),
    ]

    services = models.CharField(max_length=64, choice=EXPENSE_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='expenses'
    )


class User(AbstractUser):
    patronymic = models.CharField(max_length=64)

    phone = models.CharField(max_length=11)
    birthday = models.DateField()
    connection_address = models.CharField(max_length=15)

    CLIENT_TYPE_CHOICE = [
        ('individual', 'физическое лицо'),
        ('legal', 'юридическое лицо')
    ]
    client_type = models.CharField(max_length=128)

    STATUS_CHOICE = [
        ('connecting', 'подключение'),
        ('active', 'активный'),
        ('blocked', 'заблокирован'),
        ('annulled', 'рассторгнут')
    ]
    status = models.CharField(max_length=128, choice=STATUS_CHOICE)

    balance = models.DecimalField(max_digits=10, decimal_places=2)
    limit = models.DecimalField(max_digits=10, decimal_places=2)

    payments = models.ManyToManyField(Payment, related_name='clients')
    expenses = models.ManyToManyField(Expense, related_name='clients')
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
    )
