from urllib import response
from rest_framework import serializers

from profiles_api import models
from django.contrib.auth.models import User
from datetime import datetime


class HelloSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    name = serializers.CharField(max_length=10)
class BookSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    title = serializers.CharField(max_length=20)
    author = serializers.CharField(max_length=20)
class BookModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for BookAPIView"""
    class Meta:
        model = models.Book
        fields = ('title', 'author')
class EmpSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    id = serializers.IntegerField
    name = serializers.CharField(max_length=20)
    salary = serializers.IntegerField
class EmpModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for BookAPIView"""
    class Meta:
        model = models.Emp
        fields = ('id', 'name', 'salary')
class UserProfileSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }
class ProfileFeedItemSerializer(serializers.ModelSerializer):
    """Serializes profile feed items"""

    class Meta:
        model = models.ProfileFeedItem
        fields = ('id', 'user_profile', 'status_text', 'created_on')
        extra_kwargs = {'user_profile': {'read_only': True}}
        
class MovieSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    title = serializers.CharField(max_length=20)
    synopsis = serializers.CharField(max_length=255)
    genre = serializers.CharField(max_length=255)
    release_date=serializers.DateTimeField()
    theatre_name="Sample Theatre"
    total_seats_capacity: 100
class MovieModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for BookAPIView"""
    class Meta:
        model = models.Movie
        fields = ('title', 'synopsis','genre','release_date','theatre_name','total_seats_capacity')

class BookingSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    user_id = serializers.CharField(max_length=20)
    movie_id = serializers.CharField(max_length=255)
    seats_booked = serializers.FloatField()
    total_amount=serializers.FloatField()
   
class BookingModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for BookAPIView"""
    class Meta:
        model = models.Booking
        fields = ('user_id', 'movie_id','seats_booked','total_amount')   
