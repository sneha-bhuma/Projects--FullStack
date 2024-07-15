from django.shortcuts import render

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from loan_api import permissions,serializers
from loan_api import models
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from loan_api import permissions as custom_permissions

from rest_framework.views import APIView

# Create your views here.

#create API login
class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

# Define viewset to handle user profile actions such as creation, retrieval, and update  
class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating, creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.UpdateOwnProfile,) 
    # permission_classes = [IsAuthenticated, custom_permissions.UpdateOwnProfile]


    @action(detail=False, methods=['get'], url_path='get-by-email', url_name='get_by_email')
    def get_by_email(self, request):
        """
        Custom action to retrieve user profile by email from frontend/backend
        """
        email = request.query_params.get('email')
        if email:
            user = models.UserProfile.objects.filter(email=email).first()
            if user:
                serializer = self.get_serializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'detail': 'Email parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        """Handle updating an existing user profile"""
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoanApplicationViewSet(viewsets.ModelViewSet):
    """
    Handle creating, reading, and updating loan applications
    """
    serializer_class = serializers.LoanApplicationSerializer   
    queryset = models.LoanApplication.objects.all()


#to filter loan app by customer id for status
    @action(detail=False, methods=['get'], url_path='get_by_customer_id', url_name='get_by_customer_id')
    def get_by_customer_id(self, request):
        """
        Custom action to retrieve loan applications by customer ID from frontend/backend
        """
        customer_id = request.query_params.get('customer_id')
        if customer_id:
            loan_applications = models.LoanApplication.objects.filter(customer_id=customer_id)
            serializer = self.get_serializer(loan_applications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'customer_id parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

# Define API view to handle specific user profile actions such as update
class UserProfileApiView(APIView):
    """
    Handle specific user profile actions
    """
    serializer_class = serializers.UserProfileSerializer

    def put(self, request,id):
        """
        Handle updating an existing user profile by ID
        """
        data = request.data
        res = models.UserProfile.objects.filter(id=id).update(**data)
        if res:
            return Response(f"updated  successfully.", status=200)
        return Response(f"Error while updating the profile data.", status=400)
 
    def get(self, request, id):
        """
        Handle retrieving a user profile by ID
        """
        try:
            user = models.UserProfile.objects.get(id=id)
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except models.UserProfile.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
   
