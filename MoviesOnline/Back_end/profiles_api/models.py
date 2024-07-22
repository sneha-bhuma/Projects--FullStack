from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
 
 
from profiles_project import settings
 
 
# Create your models here.
class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""
 
    def create_user(self, email, name, password=None):
        """Create a new user profile"""
        if not email:
            raise ValueError('Users must have an email address')
 
        email = self.normalize_email(email)
        user = self.model(email=email, name=name,)
 
        user.set_password(password)
        user.save(using=self._db)
 
        return user
    def create_superuser(self, email, name, password):
        """Create and save a new superuser with given details"""
        user = self.create_user(email, name, password)
 
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
 
        return user
 
class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
 
    objects = UserProfileManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
class Book(models.Model):
    """Database model for books"""
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
 
    def __str__(self):
        """Return string representation of book"""
        return self.title + ' by ' + self.author

 
class Movie(models.Model):
    """Database model for books"""
    title = models.CharField(max_length=255)
    synopsis = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    #release_date=models.FloatField(max_length=255)
    release_date = models.DateField()
       # date = Movie.scheduled_at.date()
    theatre_name="Sample Theatre"
    total_seats_capacity: 100
    def __str__(self):
        return self.title
 
    # def __str__(self):
    #     """Return string representation of book"""
    #     return self.title + ' by ' + self.author    
class Booking(models.Model):
    # user = models.ForeignKey(user, on_delete=models.CASCADE)
    title = models.ForeignKey(Movie, on_delete=models.CASCADE)
    seats_booked = models.JSONField()  # List of seat IDs booked
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return self.id
class Emp(models.Model):
    """Database model for employees"""
    id = models.IntegerField
    name = models.CharField(max_length=255)
    salary = models.IntegerField
    def __int__(self):
        """Return integer representation of employees"""
        return self.id + ' by ' + self.salary
class ProfileFeedItem(models.Model):
    """Profile status update"""
    user_profile = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    status_text = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)
 
    def __str__(self):
        """Return the model as a string"""
        return self.status_text