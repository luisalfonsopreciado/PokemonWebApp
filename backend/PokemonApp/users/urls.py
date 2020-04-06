
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  PokemonViewSet, CustomUserViewSet, UserFavoritePokemonViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'user-favorite', UserFavoritePokemonViewSet)
router.register(r'pokemon', PokemonViewSet)
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
