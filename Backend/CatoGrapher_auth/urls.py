from django.conf.urls import url, include
from .views import register, login, edit_user,log_out

urlpatterns = [
    url(r'^register/',register),
    url(r'^login/',login),
    url(r'^edit-user/',edit_user),
    url(r'^logout/',log_out),
]