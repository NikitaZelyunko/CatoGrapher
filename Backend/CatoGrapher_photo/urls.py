from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^get-pubs/', get_pubs),
    url(r'^get-my-pubs/', get_my_pubs),
    url(r'^post/', post_pub),
    url(r'^get-comments-and-like-pub/',get_comments_and_likes_pub ),
]
