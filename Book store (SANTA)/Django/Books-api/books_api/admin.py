from django.contrib import admin

from books_api import models

# Register your models here.
admin.site.register(models.UserProfile)
admin.site.register(models.Book)
admin.site.register(models.Reviews)
