from django.shortcuts import render
from rest_framework.views import APIView

from books_api import serializers
from books_api import models
from books_api.models import Book, Reviews
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets

# Create your views here.
# Books


class BookApiView(APIView):

    serializer_class = serializers.BookSerializer

    def get(self, request):
        """Returns a list of APIView features"""

        books = Book.objects.all().values()
        return Response({'books': list(books)})

    def post(self, request):
        """post method to add new Book"""

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            title = serializer.validated_data.get('title')
            author = serializer.validated_data.get('author')
            book = Book.objects.create(title=title, author=author)
            # Book.save(book)
            message = f'Book Added {book}'
            return Response({'message': message})
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)


class BookViewSet(viewsets.ModelViewSet):
    """Test API ViewSet"""
    serializer_class = serializers.BookModelSerializer

    queryset = models.Book.objects.all()

# Reviews


class ReviewApiView(APIView):

    serializer_class = serializers.ReviewSerializer

    def get(self, request):
        """Returns a list of APIView features"""

        reviews = Reviews.objects.all().values()
        return Response({'Reviews': list(reviews)})

    def post(self, request):
        """post method to add new Reviews"""

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            book_id = serializer.validated_data.get('book_id')
            book_title = serializer.validated_data.get('book_title')
            user_name = serializer.validated_data.get('user_name')
            rating = serializer.validated_data.get('rating')
            comment = serializer.validated_data.get('comment')
            review = Reviews.objects.create(
                book_id=book_id, book_title=book_title, user_name=user_name, rating=rating, comment=comment)
            message = f'Review Added {review}'
            return Response({'message': message})
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):
    """Test API ViewSet"""
    serializer_class = serializers.ReviewModelSerializer

    queryset = models.Reviews.objects.all()


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating, creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()

