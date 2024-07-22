from rest_framework import serializers
from items_api import models
from items_api.models import Bill, Cart, UserProfile, Wishlist

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = UserProfile
        fields = ('id', 'email', 'name', 'password', 'phone_number', 'address')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return a new user"""
        user = UserProfile.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)




class ItemModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for BookAPIView"""
    class Meta:
        model = models.Item
        fields = ('id',  'category', 'name', 'description', 'price', 'image')




# items_api/serializers.py

# items_api/serializers.py
from rest_framework import serializers

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'user_id', 'product_id', 'name', 'price', 'category', 'image']
        
    

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class BillSerializer(serializers.ModelSerializer):
    # bill_date = CustomDateField()
 
    class Meta:
        model = Bill
        fields = '__all__'