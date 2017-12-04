from django.db import models
from CatoGrapher_auth.models import CustomUser



#class CatoGrapherUser(models.Model):
#    nickname_user = models.CharField(max_length=100, unique=True)
#    email_user = models.CharField(max_length=100)
#    password = models.CharField(max_length=100)
#    avatar = models.ImageField(blank=True, upload_to="CatoGrapher/photos/avatars")
#
#    def __str__(self):
#        return self.nickname_user


class Image(models.Model):
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)
    image_id = models.ImageField(upload_to="media/CatoGrapher/photos/")

class Publication(models.Model):
    created_by=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    description=models.CharField(max_length=200)
    image=models.ForeignKey(Image, on_delete=models.CASCADE)

class Comments(models.Model):
    publication_id = models.ForeignKey(Publication, on_delete=models.CASCADE)
    date = models.DateTimeField()
    sender_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    text = models.TextField()
    image=models.ForeignKey(Image, on_delete=models.CASCADE, default=None)


class Likes(models.Model):
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE, default=None)
    like_at = models.DateTimeField(auto_now_add=True)
    sender_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
# Create your models here.