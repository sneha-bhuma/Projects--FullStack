from rest_framework import serializers

from profiles_api import models
from rest_framework import serializers
from profiles_api.models import Appointment, Doctor, Patient



# class UserProfileSerializer(serializers.ModelSerializer):
#     """Serializes a user profile object"""

#     class Meta:
#         model = models.UserProfile
#         fields = ('id', 'email', 'name', 'password')
#         extra_kwargs = {
#             'password': {
#                 'write_only': True,
#                 'style': {'input_type': 'password'}
#             }
#         }
#     def create(self, validated_data):
#         """Create and return a new user"""
#         user = models.UserProfile.objects.create_user(
#             email=validated_data['email'],
#             name=validated_data['name'],
#             password=validated_data['password']
#         )
#         return user
#     def update(self, instance, validated_data):
#         """Handle updating user account"""
#         if 'password' in validated_data:
#             password = validated_data.pop('password')
#             instance.set_password(password)
#         return super().update(instance, validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password', 'is_superuser')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'is_superuser': {
                'read_only': True
            }
        }

    def create(self, validated_data):
        """Create and return a new user"""
        user = models.UserProfile.objects.create_user(
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
    
class DoctorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        
class AppointmentModelSerializer(serializers.ModelSerializer):
    patient = PatientModelSerializer(read_only=True)
    doctor = DoctorModelSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ['patient', 'doctor', 'appointment_date', 'slot', 'problem_description']

