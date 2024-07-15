from django.urls import include, path
from loan_api import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('bookvs', views.BookViewSet, basename='bookvs')
# router.register('employeevs', views.EmployeeViewSet, basename='employeevs')
router.register('profile', views.UserProfileViewSet,basename='profile')
router.register('loanapp', views.LoanApplicationViewSet)
#router.register('profile/<str:email>/',views.UserProfileViewSet,basename='get profile by email')
#path('api/profile/<str:email>/', views.UserProfileView.as_view(), name='user-profile'),




urlpatterns = [
	
    path('login/', views.UserLoginApiView.as_view()), #api login
    #path('profile/<str:email>/', views.UserProfileViewSet.as_view({'get': 'retrieve'}), name='profile-by-email'),
    path('api/profile/get-by-email/', views.UserProfileViewSet.as_view({'get': 'get_by_email'}), name='get_by_email'),
    #profile/<int:id>/ both get by id and update by id 
    path('profile/<int:id>/', views.UserProfileApiView.as_view(), name='update_by_id'),
    path('api/loanapp/get_by_customer_id/', views.LoanApplicationViewSet.as_view({'get': 'get_by_customer_id'}), name='get_by_customer_id'),
    path('', include(router.urls)),

]


