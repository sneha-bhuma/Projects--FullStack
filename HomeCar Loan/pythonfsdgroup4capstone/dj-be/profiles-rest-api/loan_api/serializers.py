
from rest_framework import serializers
from loan_api import models

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        #fields = ('id', 'name', 'email', 'password', 'mobile_number', 'user_type')
        #fields = ('id', 'name', 'email', 'password', 'mobile_number', 'user_type', 'date_of_birth', 'gender', 'marital_status', 'address', 'occupation', 'monthly_income', 'bank_account_details')
        fields = '__all__' # Serializes all fields in the UserProfile model
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

#to apply hashing of password for normal user as well (admin-default hashing applies) 
    # def create(self, validated_data):
    #     user = models.UserProfile.objects.create_user(
    #         name=validated_data['name'],
    #         email=validated_data['email'],
    #         password=validated_data['password'],
    #         mobile_number=validated_data.get('mobile_number'),
    #         user_type=validated_data.get('user_type', 'customer'),
    #     )
    #     return user
    def create(self, validated_data):
        user = models.UserProfile.objects.create_user(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password'],
            mobile_number=validated_data.get('mobile_number'),
            user_type=validated_data.get('user_type', 'customer'),
            date_of_birth=validated_data.get('date_of_birth'),
            gender=validated_data.get('gender'),
            marital_status=validated_data.get('marital_status'),
            address=validated_data.get('address'),
            occupation=validated_data.get('occupation'),
            monthly_income=validated_data.get('monthly_income'),
            bank_account_details=validated_data.get('bank_account_details')
        )
        return user
    
       

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)


class LoanApplicationSerializer(serializers.ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(queryset=models.UserProfile.objects.all())

    class Meta:
        model = models.LoanApplication
        fields = ('id', 'customer_id', 'loan_type', 'loan_amount', 'tenure', 'status')
        extra_kwargs = {
            'dotted_source_field_name': {'read_only': True},
        }

#for loan app form
    def create(self, validated_data):
        customer = validated_data.pop('customer_id')
        loan_application = models.LoanApplication.objects.create(customer_id=customer, **validated_data)
        return loan_application