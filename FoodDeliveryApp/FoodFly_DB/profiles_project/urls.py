from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from items_api import views

router = DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
   path('api/', include('items_api.urls')),
]
    

