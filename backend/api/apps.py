from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self) -> None:
        from workers.expense_worker import ExpenseWorker
        worker = ExpenseWorker() # noqa : F841
