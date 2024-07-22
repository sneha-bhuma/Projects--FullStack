from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from items_api import serializers, models, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from items_api.models import  Item, Wishlist, Bill
from django.contrib.auth import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.decorators import action
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating, creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)





from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.settings import api_settings

class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication tokens"""

    # Ensure the view uses default renderer classes
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        # Instantiate the serializer class with request data
        serializer = self.serializer_class(data=request.data, context={'request': request})
        
        # Validate serializer data
        if serializer.is_valid():
            # Retrieve the authenticated user object from validated data
            user = serializer.validated_data['user']
            
            # Check if user object exists
            if user:
                # Generate or retrieve the token for the user
                token, created = Token.objects.get_or_create(user=user)
                
                # Prepare response data based on user type
                response_data = {
                    'token': token.key,
                    'user': {
                        'id': user.id,
                        'name': user.name,
                        # Add more user attributes as needed
                    }
                }
                
                # If the user is a superuser, add a flag to the response
                if user.is_superuser:
                    response_data['user']['is_superuser'] = True
                else:
                    response_data['user']['is_superuser'] = False
                
                # Return the token key and user information in the response
                return Response(response_data)
            else:
                # Return error response if user is not valid
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Return serializer errors if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemViewSet(viewsets.ModelViewSet):
    """Test API ViewSet"""
    serializer_class = serializers.ItemModelSerializer

    queryset = Item.objects.all()



# items_api/views.py

# items_api/views.py
# items_api/views.py
# items_api/views.py
from rest_framework import viewsets

from .models import Cart, Item, Wishlist
from .serializers import BillSerializer, CartSerializer, WishlistSerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    
    @action(detail=False, methods=['delete'], url_path='delete_all')
    def delete_all(self, request):
        user_id = request.query_params.get('user_id', None)
        if user_id:
            Wishlist.objects.filter(user_id=user_id).delete()
            return Response({'message': 'All items removed from wishlist'}, status=status.HTTP_200_OK)
        return Response({'error': 'User ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
    


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    # Handle individual item deletion
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Custom action for deleting all items for a user
    @action(detail=False, methods=['delete'], url_path='delete_all')
    def delete_all(self, request):
        user_id = request.query_params.get('user_id', None)
        if user_id:
            Cart.objects.filter(user_id=user_id).delete()
            return Response({'message': 'All items removed from Cart'}, status=status.HTTP_200_OK)
        return Response({'error': 'User ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
    


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
 
class BillApiViewSet(APIView):
    serializer_class = BillSerializer
 
   
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Bill
import json
 
 
@csrf_exempt
def add_bill(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debugging line
            bill = Bill.objects.create(
                GST=data['GST'],
                platform_fee=data['platform_fee'],
                delivery_fee=data['delivery_fee'],
                totalbill=data['totalbill'],
                totalprice=data['totalprice'],
                quantity=data['quantity'],
                user_id=data['user_id'],
                bill_date=data['bill_date']
            )
           
            return JsonResponse({'id': bill.id}, status=201)
        except (KeyError, json.JSONDecodeError) as e:
            print("Error:", str(e))  # Debugging line
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)
 
