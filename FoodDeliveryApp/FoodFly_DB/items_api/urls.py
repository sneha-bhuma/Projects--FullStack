from django.urls import path, include
from rest_framework.routers import DefaultRouter
from items_api import views

router = DefaultRouter()

router.register('itemvs', views.ItemViewSet, basename='itemvs')

router.register(r'users', views.UserProfileViewSet)
router.register(r'wishlist', views.WishlistViewSet)
router.register(r'cart', views.CartViewSet)
router.register(r'bill', views.BillViewSet)

# register laptops view set


urlpatterns = [
    
    path('login/', views.UserLoginApiView.as_view()),
    
    
    path('', include(router.urls)),
]
