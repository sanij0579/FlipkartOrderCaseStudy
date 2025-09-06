from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Address, OTPVerification
from .serializers import AddressSerializer, OTPSerializer
from django.conf import settings
from twilio.rest import Client
import random
import re


def normalize_phone(phone):
    phone = phone.strip()
    if not phone.startswith('+'):
        if phone.startswith('0'):
            phone = phone[1:]
        phone = '+91' + phone
    return phone


def send_otp(phone):
    phone = normalize_phone(phone)

    # Basic validation: only 10-digit Indian numbers
    if not re.fullmatch(r'^\+91[6-9]\d{9}$', phone):
        raise ValueError("Invalid Indian mobile number")

    otp = str(random.randint(100000, 999999))
    print(f"[DEBUG] Generated OTP: {otp} for phone: {phone}")

    # Clear previous OTPs
    OTPVerification.objects.filter(phone=phone).delete()

    OTPVerification.objects.create(phone=phone, otp=otp)

    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        client.messages.create(
            body=f'Your OTP is {otp}',
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone
        )
    except Exception as e:
        print(f"[Twilio Error] {e}")
        raise

    return otp

# ✅ Save Address API
class SaveAddressView(APIView):
    def post(self, request):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Address saved successfully'}, status=200)
        return Response(serializer.errors, status=400)

# ✅ Send OTP API
class SendOTPView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        if not phone:
            return Response({'error': 'Phone number is required'}, status=400)
        try:
            send_otp(phone)
            return Response({'message': 'OTP sent successfully'}, status=200)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=400)
        except Exception as e:
            print(f"[ERROR] OTP sending failed: {e}")
            return Response({'error': 'Failed to send OTP'}, status=500)

# ✅ Verify OTP API
class VerifyOTPView(APIView):
    def post(self, request):
        phone = normalize_phone(request.data.get('phone', ''))
        otp = request.data.get('otp')

        if not phone or not otp:
            return Response({'error': 'Phone and OTP are required'}, status=400)

        try:
            obj = OTPVerification.objects.filter(phone=phone, otp=otp).last()

            if obj:
                obj.is_verified = True
                obj.save()

                print(f"[DEBUG] OTP verified for {phone}")
                return Response({'message': 'OTP verified ✅'}, status=200)

            print(f"[DEBUG] Invalid OTP attempt: phone={phone}, otp={otp}")
            return Response({'error': 'Invalid OTP'}, status=400)
        except Exception as e:
            print(f"[ERROR] OTP verification error: {e}")
            return Response({'error': 'Something went wrong during OTP verification'}, status=500)