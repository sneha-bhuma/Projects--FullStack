from rest_framework import serializers

from books_api import models

# Books API
class BookSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    title = serializers.CharField(max_length=20)
    author = serializers.CharField(max_length=20)


class BookModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for BookAPIView"""
    class Meta:
        model = models.Book
        fields = ('id', 'title', 'author', 'category',
                  'synopsis', 'isbn', 'publication_date', 'price','image')

# Reviews API


class ReviewSerializer(serializers.Serializer):
    """Serializes a name field for testing out APIView"""
    book_id = serializers.CharField(max_length=255)
    book_title = serializers.CharField(max_length=255)
    user_name = serializers.CharField(max_length=255)
    rating = serializers.DecimalField(max_digits=2, decimal_places=1)
    comment = serializers.CharField(max_length=255)
    image = serializers.CharField(max_length=255)


class ReviewModelSerializer(serializers.ModelSerializer):
    """Serializes title and author fields for ReviewAPIView"""
    class Meta:
        model = models.Reviews
        fields = ('id','book_id', 'book_title', 'user_name', 'rating', 'comment','image')




class UserProfileSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password', 'role')
        # extra_kwargs = {
        #     # 'password': {
        #     #     'write_only': True,
        #     #     'style': {'input_type': 'password'}
        #     # }
        # }
