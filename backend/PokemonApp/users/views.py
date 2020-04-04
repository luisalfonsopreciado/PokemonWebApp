from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from .serializers import PokemonSerializer, UserFavoritePokemonSerializer, CustomUserSerializer
from.models import Pokemon, UserFavoritePokemon, CustomUser
from .permission import IsOwnerOrReadOnly


class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class UserFavoritePokemonViewSet(viewsets.ModelViewSet):
    queryset = UserFavoritePokemon.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = UserFavoritePokemonSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAdminUser, IsOwnerOrReadOnly]
    serializer_class = CustomUserSerializer

