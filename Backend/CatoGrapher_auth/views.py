from django.shortcuts import render
from .models import CustomUser
from .serializer import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from django.contrib import auth
from django.utils.datastructures import MultiValueDictKeyError
import json


# Create your views here.
@api_view(['POST'])
def register(request):
    print("hello")
    try:
        data = json.loads(request.POST['data'])
        email = data['email']
        nickname = data['nickname']
        password = data['password']
    except MultiValueDictKeyError:
        return Response({'c': 'error', 'd': 'bad request'}, status=400)

    try:
        avatar = request.FILES['avatar']
    except MultiValueDictKeyError:
        avatar = None

    from django.contrib.auth.hashers import make_password

    if CustomUser.objects.filter(email__iexact=email).exists():
        return Response({'c': 'error', 'd': 'exist'}, status=400)
    try:
        CustomUser.objects.create(email=email,
                                nickname=nickname,
                                password=make_password(password),
                                avatar=avatar)
    except ValueError as error:
        return Response({'c':'error','d':error.__str__()},status=400)

    return Response({'status': 'success'}, status=201)

    # serializer = CustomUserSerializer(data=data, partial=True)
    # if serializer.is_valid():
    #
    #     if avatar:
    #         try:
    #             CustomUser.objects.create_user(email=email,
    #                                            nickname=nickname,
    #                                            password=make_password(password),
    #                                            avatar=avatar)
    #         except ValueError as error:
    #             return Response({'c': 'error', 'd': error.__str__()}, status=400)
    #     else:
    #         CustomUser.objects.create_user(email=email,
    #                                        nickname=nickname,
    #                                        password=make_password(password))
    #     return Response({'status': 'success'}, status=201)
    # else:
    #     return Response({'c': 'error', 'd': 'data is not valid'}, status=400)


@api_view(['POST'])
def login(request):
    try:
        data = request.data
        email = data['email']
        password = data['password']
    except MultiValueDictKeyError:
        return Response({'c': 'error', 'd': 'bad request'}, status=400)

    user = auth.authenticate(email=email, password=password)
    if (user == None):
        return Response({'error': 'not correct email or password '}, status=401)
    else:
        if (not Token.objects.filter(user=user)):
            Token.objects.create(user=user)
        if user:
            auth.login(request, user)
            serializer = CustomUserSerializer(user)
            response_data = {'token': user.auth_token.key}
            return Response(response_data, status=200)
        elif CustomUser.objects.filter(email=email, is_active=False).exists():
            return Response({'c': 'error', 'd': 'inactive'}, status=401)
        else:
            return Response({'c': 'error', 'd': 'not_exist'}, status=401)

@api_view(['GET'])
def log_out(request):
    auth.logout(request)
    Token.objects.filter(key=request.auth).delete()
    return Response({'logout': 'OK'}, status=200)


@api_view(['POST'])
def edit_user(request):
    if request.user.is_authenticated:
        user = request.auth.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response('OK', status=200)
        return Response(serializer.error_messages, status=200)
    return Response('ERROR', status=400)

@api_view(['GET'])
def get_user(request):
    serializer=CustomUserReadSerializer(request.auth.user)
    return Response(serializer.data,status=200)


@api_view(['POST'])
def subscribe(request):
    subscribe_to = CustomUser.objects.get(nickname=request.data['nickname'])
    if Subscription.objects.filter(subscriber=request.auth.user, subscribe_to=subscribe_to).exists():
        Subscription.objects.get(subscriber=request.auth.user, subscribe_to=subscribe_to).delete()
    else:
        Subscription.objects.create(subscriber=request.auth.user, subscribe_to=subscribe_to)
    return Response({'status': 'success'}, status=200)

@api_view(['GET'])
def get_subs(request):
    from .utils import get_subscriptions
    users = CustomUserReadSerializer(get_subscriptions(request.auth.user), many=True)
    return Response(users.data, status=200)
