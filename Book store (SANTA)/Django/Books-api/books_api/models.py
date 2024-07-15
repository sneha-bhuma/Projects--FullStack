from django.db import models

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

from profiles_project import settings

# Create your models here.


class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, name, role, password):
        """Create a new user profile"""
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        name = self.normalize_name(name)
        role = self.normalize_role(role)
        user = self.model(email=email, name=name, role=role )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, role):
        """Create and save a new superuser with given details"""
        user = self.create_user(email, name, password, role)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, default='user')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


class Book(models.Model):
    """Database model for books"""
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    synopsis = models.TextField()
    isbn = models.CharField(max_length=13)
    publication_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=255,default='../../assets/images/default.jpg')
    

    def __str__(self):
        """Return string representation of book"""
        return self.title + ' by ' + self.author


class Reviews(models.Model):
    """Database model for Reviews"""
    book_id = models.CharField(max_length=255)
    book_title = models.CharField(max_length=255)
    user_name = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comment = models.TextField()
    image = models.CharField(max_length=255,default='../../assets/images/default.jpg')

    def __str__(self):
        """Return string representation of book"""
        return f"for {self.book_id} by {self.book_title} reviewed by {self.user_name} with rating {self.rating} and comments '{self.comment}'"
