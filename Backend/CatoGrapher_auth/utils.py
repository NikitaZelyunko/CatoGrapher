from .models import CustomUser


def get_subscriptions(me):
    subscriptions = CustomUser.objects.filter(subscribe_to__subscriber=me)
    return subscriptions
