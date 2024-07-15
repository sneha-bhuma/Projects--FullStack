from django.urls import include, path
from profiles_api import views
from rest_framework.routers import DefaultRouter
from profiles_api import views

router = DefaultRouter()

router.register('profile', views.UserProfileViewSet)
router.register('doctorvs', views.DoctorViewSet, basename='doctorvs')

urlpatterns = [
	
    path('login/', views.UserLoginApiView.as_view()),
    path('doctors/', views.DoctorApiView.as_view()),
    path('patients/', views.PatientApiView.as_view()),
    path('appointments/', views.AppointmentApiView.as_view()),
    path('appointments/<str:patient_id>', views.AppointmentApiView.as_view()),
    path('appointments/delete/<str:appointment_id>', views.AppointmentApiView.as_view()),
    path('doctors/<str:doctor_id>', views.DoctorApiView.as_view()),
    path('patients/<str:patient_id>', views.PatientApiView.as_view()),
    path('patients/email/<str:email>/', views.PatientApiView.as_view(), name='patient-by-email'),
    path('', include(router.urls)),

]
