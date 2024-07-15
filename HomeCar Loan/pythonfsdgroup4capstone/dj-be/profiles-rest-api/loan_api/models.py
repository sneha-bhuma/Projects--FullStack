from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.forms import ValidationError
 
# Create your models here.
class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""
    def create_user(self, name, email,  password=None, mobile_number=None, user_type='customer',**extra_fields):
        """Create a new user profile"""
        if not email:
            raise ValueError('Users must have an email address')
 
        email = self.normalize_email(email)
        #new user instance
        user = self.model(name=name,email=email,  mobile_number=mobile_number, user_type=user_type, **extra_fields)
 
        user.set_password(password)
        user.save(using=self._db)
 
        return user
    def create_superuser(self, name,email,  password, mobile_number=None, user_type='admin',**extra_fields):
        """Create and save a new superuser with given details"""
        user = self.create_user(name,email,  password, mobile_number, user_type,**extra_fields)
        
        #super user attributes
        user.is_superuser = True     
        user.is_staff = True
        user.save(using=self._db)
 
        return user
class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('customer', 'Customer'),
        ('approver', 'Approver'),
    )
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )
    MARITAL_STATUS_CHOICES = (
        ('single', 'Single'),
        ('married', 'Married'),
       
    )
    
    id = models.AutoField(primary_key=True)  # Explicit primary key definition
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='customer')
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True,default="")
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, null=True, blank=True,default="")
    address = models.TextField(null=True, blank=True,default="")
    occupation = models.CharField(max_length=50, null=True, blank=True,default="")
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True,default=0)
    bank_account_details = models.CharField(max_length=50, null=True, blank=True,default="")

    is_active = models.BooleanField(default=True)  #indicates user is active.
    is_staff = models.BooleanField(default=False) #Indicates whether the user is staff.
 
    objects = UserProfileManager()
 
    USERNAME_FIELD = 'email'   #display username as email in admin portal
    REQUIRED_FIELDS = ['name'] 

#added this newly
    def __str__(self):
        return self.email  # Return a meaningful representation


class LoanApplication(models.Model):
    """Database model for loan applications"""
    LOAN_TYPE_CHOICES = (
        ('home', 'Home Loan'),
        ('car', 'Car Loan'),
        # Add other loan types when needed
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        # Add other statuses when needed
    )

    #customer_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, )
    customer_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='loan_applications')
    loan_type = models.CharField(max_length=20, choices=LOAN_TYPE_CHOICES)
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tenure = models.PositiveIntegerField()  # Tenure in months or years, depending on your requirement
    #tenure = models.PositiveSmallIntegerField()  # Tenure in years
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    #built-in method used for model validation for loan_amount
    def clean(self):
        """Custom validation for loan amount based on loan type."""
        if self.loan_type == 'car' and self.loan_amount > 9999999.99:
            raise ValidationError('For car loans, the maximum loan amount is 9,999,999.99')
        elif self.loan_type == 'home' and self.loan_amount > 99999999.99:
            raise ValidationError('For home loans, the maximum loan amount is 99,999,999.99')

    def save(self, *args, **kwargs):
        # Call the clean method to enforce the validation
        self.clean() # Ensure data integrit
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Loan {self.loan_type} for {self.customer_id.email} - {self.status}"
        
    




