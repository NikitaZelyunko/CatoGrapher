from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^register/',register),
    url(r'^login/',login),
    url(r'^edit-user/',edit_user),
    url(r'^logout/',log_out),
    url(r'^get-user/',get_user),
    url(r'^subscribe/',subscribe),
    url(r'^get-subs/',get_subs),
]
