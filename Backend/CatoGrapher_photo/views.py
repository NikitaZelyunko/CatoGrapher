from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from CatoGrapher_auth.utils import get_subscriptions


@api_view(['GET'])
def get_my_pubs(request):
    pubs = Publication.objects.filter(created_by=request.auth.user)\
        .values('image', 'description', 'created', 'updated', 'id')
    return Response(pubs, status=200)


@api_view(['GET'])
def get_pubs(request):
    pubs = Publication.objects.filter(created_by__in=get_subscriptions(request.auth.user)).order_by('updated')\
        .values('image', 'description', 'created', 'updated', 'id')
    return Response(pubs, status=200)


@api_view(['POST'])
def post_pub(request):
    description = request.data['description']
    image = request.data['image']
    Publication.objects.create(created_by=request.auth.user, description=description, image=image)
    return Response({'status': 'success'}, status=200)


@api_view(['POST'])
def like(request):
    pub = Publication.objects.get(pk=request.data['id'])
    if Like.objects.filter(author=request.auth.user, publication=pub).exists():
        Like.objects.get(author=request.auth.user, publication=pub).delete()
    else:
        Like.objects.create(author=request.auth.user, publication=pub)
    return Response({'status': 'success'}, status=200)


@api_view(['POST'])
def comment(request):
    pub = Publication.objects.get(pk=request.data['id'])
    Comment.objects.create(publication=pub, author=request.auth.user, text=request.data['text'])
    return Response({'status': 'success'}, status=200)


@api_view(['POST'])
def get_comments_and_likes_pub(request):
    publication_id=request.data['id_pub']
    comments=Comment.objects.filter(publication_id=publication_id)
    count_likes=Like.objects.filter(publication_id=publication_id).count()
    return Response({'comments':comments, 'count_likes':count_likes},status=200)

