
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  PokemonViewSet, CustomUserViewSet, UserFavoritePokemonDetail

# Create a router and register our viewsets with it.
router = DefaultRouter()
# router.register(r'user-favorite', UserFavoritePokemonViewSet)
router.register(r'pokemon', PokemonViewSet)
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user-favorite/<int:pk>/', UserFavoritePokemonDetail.as_view()),
]
