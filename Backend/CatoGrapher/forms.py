from .models import Image, Comments, Likes
from CatoGrapher_auth.models import CustomUser
from django import forms
from django.contrib.admin import widgets


class OrderForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ["email", "nickname", "password", "avatar"]


class PhotoForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ["image_id", "created_by"]


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ["publication_id", "date", "sender_id", "text", "image"]
