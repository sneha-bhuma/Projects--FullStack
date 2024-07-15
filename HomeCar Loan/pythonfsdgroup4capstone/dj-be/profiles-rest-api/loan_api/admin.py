from django.contrib import admin

from loan_api import models

# Register your models here.
admin.site.register(models.UserProfile)
admin.site.register(models.LoanApplication)