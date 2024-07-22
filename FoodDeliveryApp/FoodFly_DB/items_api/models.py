from datetime import date
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from items_api.validators import validate_no_numbers

class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, name, password=None):
        """Create a new user profile"""
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
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
    name = models.CharField(max_length=255, validators=[validate_no_numbers])
    phone_number = models.SmallIntegerField(blank=True, null=True, max_length=10)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='userprofile_set',  # Add this related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='userprofile_set',  # Add this related_name
        blank=True
    )

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email




class Item(models.Model):
    
    category = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=200)

    def __str__(self):
        return self.name   
    


# items_api/models.py

from django.db import models
from django.conf import settings
from django.conf import settings
class Wishlist(models.Model):
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='wishlist_items_related', default=True)
    product_id = models.IntegerField()  # Assuming you store product IDs as integers
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    image = models.CharField(max_length=200)  # Assuming you store image URLs
    #added_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self):
        return f'{self.user} - {self.product_id} - {self.name}'



class Cart(models.Model):
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='Cart_items_related', default=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=200)
    product_id = models.IntegerField(default=True) 
    quantity= models.IntegerField(default=True)
    def __str__(self):
        return f"Cart {self.name}"
    


class Bill(models.Model):
   
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE,default=True)
    countcart =  models.IntegerField()
    totalprice = models.DecimalField(max_digits=10, decimal_places=2)
    GST = models.DecimalField(max_digits=10, decimal_places=2)
    platform_fee = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2)
    totalbill = models.DecimalField(max_digits=10, decimal_places=2)
    bill_date = models.DateField(default=date.today)
 
 
    def __str__(self):
        return f"Bill {self.user_id}"    
