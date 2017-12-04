from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, HttpRequest
from .forms import *
from .models import *
import datetime
from CatoGrapher_auth.models import CustomUser
from django.utils import timezone
from django.core.urlresolvers import reverse
import json


def reg(request):
    form = OrderForm(request.POST or None, request.FILES or None)
    print(form)
    if request.method == "POST" and form.is_valid():
        form.save()
        return HttpResponseRedirect(reverse('CatoGrapher:login'))

    return render(request, 'CatoGrapher/reg.html', {"form": form})


def dele(request, idph):
    if request.session.get('member_id', None):
        m = Image.objects.get(pk=int(idph))
        m.delete()
    return HttpResponseRedirect(reverse('CatoGrapher:home'))

def addphoto(request):
    if request.session.get('member_id', None):
        m = CustomUser.objects.get(pk=request.session['member_id'])
        form = PhotoForm(request.POST or None, request.FILES or None, initial={
                             "created_by": m.id
                         })
        form.fields['created_by'].widget = forms.HiddenInput()
        if request.method == "POST" and form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('CatoGrapher:ura'))

        return render(request, 'CatoGrapher/addphoto.html', {"form": form, "user": m.nickname_user})
    else:
        return HttpResponse("Чтобы выложить фото, зайдите на сайт")


def profile(request):
    if request.session.get('member_id', None):
        m = CustomUser.objects.get(pk=request.session['member_id'])
        context = {
            'id' : m.id,
            'nickname_user': m.nickname_user,
            'email_user': m.email_user,
            'image_id' : m.image_id.url
        }
        return render(request, 'CatoGrapher/profile.html', context)
    else:
        return HttpResponse("Чтобы посмотреть свою страницу, зайдите на сайт")


def makelike(request, idph):
    if request.session.get('member_id', None):
        m = Image.objects.get(pk=int(idph))
        like = Likes(picture=m, created=timezone.now() - datetime.timedelta(days=1),
                     sender_id=CustomUser.objects.get(pk=request.session['member_id']))
        like.save()
    return HttpResponseRedirect(reverse('CatoGrapher:photo', kwargs={'idph': idph}))


def photo(request, idph):
    if request.session.get('member_id', None):
        m = Image.objects.get(pk=int(idph))
        liik = len(Likes.objects.filter(picture=m))
        form = CommentForm(request.POST or None, request.FILES or None, initial={
                             "publication_id": m.id,
                             "date" : timezone.now() - datetime.timedelta(days=1),
                             "sender_id" : CustomUser.objects.get(pk=request.session['member_id']).id,
                         })
        form.fields['sender_id'].widget = forms.HiddenInput()
        form.fields['publication_id'].widget = forms.HiddenInput()
        form.fields['date'].widget = forms.HiddenInput()
        if request.method == "POST" and form.is_valid():
            form.save()
        create = CustomUser.objects.get(pk=m.created_by.id).nickname_user
        context = {
            'id' : m.id,
            'created_by': create,
            'created_at': m.created_at,
            'image_id' : m.image_id.url,
            'form' : form,
            'l_num': liik,
        }
        try:
            com = Comments.objects.filter(publication_id=m.id)[:5]
            context['comments'] = com
        except Comments.DoesNotExist:
            pass

        return render(request, 'CatoGrapher/photo.html', context)
    else:
        return HttpResponse("Чтобы посмотреть фото, зайдите на сайт")

import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def home(request):
    print(os.path.join(BASE_DIR, "static"))
    context = {
        'images': Image.objects.order_by('created_at')[:5]
    }
    return render(request, 'CatoGrapher/home.html', context)


def uspeh(request):
    return render(request, 'CatoGrapher/uspeh.html')


def login(request):
    if request.method == "POST":
        try:
            #print(request.body)
            m = CustomUser.objects.get(email=request.POST['username'])
            print(m.password)
            print(request.POST['password'])
            if m.password == request.POST['password']:
                request.session['member_id'] = m.id
                return HttpResponse("Вы авторизованы.")
            else:
                return HttpResponse("Неправильный пароль.")
        except CustomUser.DoesNotExist:
            return HttpResponse("Ваши логин и пароль не соответствуют.")

    return render(request, 'CatoGrapher/auth.html')


def lout(request):
    return render(request, 'CatoGrapher/lout.html')


def log_out(request):
    try:
        del request.session['member_id']
    except KeyError:
        pass

    return HttpResponse("Вы вышли.")

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view

@api_view(['GET'])
def angular(request):
    user=CustomUser.objects.get(email='nik@yandex.ru')
    print(user.avatar.url.__str__())
    return Response({'href':user.avatar.url},status=200)
