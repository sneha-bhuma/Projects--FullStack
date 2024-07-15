from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

from profiles_project import settings

import random
import string

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

def generate_id():
    existing_ids = list(Doctor.objects.values_list('doctor_id', flat=True)) + list(Patient.objects.values_list('patient_id', flat=True))
    while True:
        new_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        if new_id not in existing_ids:
            return new_id

def generate_appointment_id(doctor, patient):
    generated_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f'{doctor.doctor_id}-{patient.patient_id}-{generated_id}'

class Doctor(models.Model):
    doctor_id = models.CharField(max_length=6, unique=True, primary_key=True, default=generate_id)
    doctor_name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)

class Patient(models.Model):
    patient_id = models.CharField(max_length=6, unique=True, primary_key=True, default=generate_id)
    patient_name = models.CharField(max_length=100)
    dob = models.DateField()
    sex = models.CharField(max_length=10)
    height = models.CharField(max_length=3)
    weight = models.CharField(max_length=3)
    marital_status = models.CharField(max_length=10)
    phone = models.CharField(max_length=10)
    email = models.EmailField()
    allergies = models.CharField(max_length=255, blank=True, null=True)
    medications = models.CharField(max_length=255)
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=6)
    emg_contact_name = models.CharField(max_length=100)
    emg_contact_phone = models.CharField(max_length=10)


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    # patient_id = models.CharField(max_length=100)
    # patient_name = models.CharField(max_length=100)
    appointment_id = models.CharField(max_length=20, unique=True, primary_key=True, blank=True)
    # doctor_name = models.CharField(max_length=100)
    # speciality = models.CharField(max_length=100) 
    appointment_date = models.DateField()
    slot = models.CharField(max_length=100)
    problem_description = models.TextField()

    def save(self, *args, **kwargs):
        if not self.appointment_id:
            while True:
                generated_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                new_appointment_id = f'{self.doctor.doctor_id}-{self.patient.patient_id}-{generated_id}'
                if not Appointment.objects.filter(appointment_id=new_appointment_id).exists():
                    self.appointment_id = new_appointment_id
                    break
        super(Appointment, self).save(*args, **kwargs)
