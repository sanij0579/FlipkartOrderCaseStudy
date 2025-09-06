from django.urls import path
from .views import SaveAddressView, SendOTPView, VerifyOTPView

urlpatterns = [
    path('save-address/', SaveAddressView.as_view()),
    path('send-otp/', SendOTPView.as_view()),
    path('verify-otp/', VerifyOTPView.as_view()),
]