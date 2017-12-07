from django.db import models
from CatoGrapher_auth.models import CustomUser


class Publication(models.Model):
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_by')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to="media/CatoGrapher/photos/")


class Comment(models.Model):
    publication = models.ForeignKey(Publication, related_name='publication_comment')
    author = models.ForeignKey(CustomUser, related_name='author_comment')
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()


class Like(models.Model):
    publication = models.ForeignKey(Publication, related_name='publication_like')
    author = models.ForeignKey(CustomUser, related_name='author_lile')
