from rest_framework import serializers
from .models import Address, OTPVerification

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTPVerification
        fields = ['phone', 'otp']