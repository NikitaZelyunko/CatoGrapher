from rest_framework import serializers
from .models import *
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        exclude=('id','is_superuser')

class CustomUserReadSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=('first_name','last_name','nickname','avatar')