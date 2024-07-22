from django.urls import include, path
from profiles_api import views
from rest_framework.routers import DefaultRouter
from profiles_api import views

router = DefaultRouter()
#router.register('bookvs', views.BookViewSet, basename='bookvs')
router.register('bookvs', views.BookViewSet)
router.register('profilevs', views.UserProfileViewSet)
router.register('feedvs', views.UserProfileFeedViewSet)
# router.register('movies',views.MovieViewSet)
router.register('booking',views.BookingViewSet)


urlpatterns = [
	path('hello-view/', views.HelloApiView.as_view()),
    path('books-view/', views.BookApiView.as_view()),
    path('emp-view/', views.EmpApiView.as_view()),
    path('login/', views.UserLoginApiView.as_view()),
    path('booking/', views.BookApiView.as_view()),
    path('movies/', views.MovieApiView.as_view()),
    path('', include(router.urls)),

]
