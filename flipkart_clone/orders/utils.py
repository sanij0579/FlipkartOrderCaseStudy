from twilio.rest import Client
from django.conf import settings
import random

otp_store = {}  # In-memory OTP store; use Redis or DB in production

def send_otp(phone):
    if not phone.startswith('+'):
        phone = '+91' + phone

    print(f"[DEBUG] Sending OTP to: {phone}")
    print(f"[DEBUG] Using from_: {settings.TWILIO_PHONE_NUMBER}")

    otp = str(random.randint(100000, 999999))
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    try:
        message = client.messages.create(
            body=f"Your OTP for Flipkart Clone is: {otp}",
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone
        )
        otp_store[phone] = otp
        return otp
    except Exception as e:
        print(f"[ERROR] Twilio exception: {e}")
        raise
