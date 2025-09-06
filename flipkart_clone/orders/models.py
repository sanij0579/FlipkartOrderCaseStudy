from django.db import models

class Address(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address_line = models.CharField(max_length=255, default='N/A')  # ✅ This is okay for CharField
    city = models.CharField(max_length=50)
    pincode = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ Correct for timestamp

    def __str__(self):
        return f"{self.name}, {self.address_line}, {self.city}"

class OTPVerification(models.Model):
    phone = models.CharField(max_length=15)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ Automatically set timestamp
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.phone} - {'Verified' if self.is_verified else 'Pending'}"
