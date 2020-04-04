from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from .serializers import PokemonSerializer, UserFavoritePokemonSerializer, CustomUserSerializer
from.models import Pokemon, UserFavoritePokemon, CustomUser
from .permission import IsOwnerOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http import Http404


class PokemonViewSet(viewsets.ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# class UserFavoritePokemonViewSet(viewsets.ModelViewSet):
#     queryset = UserFavoritePokemon.objects.all()
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     serializer_class = UserFavoritePokemonSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAdminUser, IsOwnerOrReadOnly]
    serializer_class = CustomUserSerializer

class UserFavoritePokemonDetail(APIView):
    def get_object(self, pk):
        try:
            return UserFavoritePokemon.objects.get(user=pk)
        except UserFavoritePokemon.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        user_favorite = self.get_object(pk)
        serializer = UserFavoritePokemonSerializer(user_favorite, data=request.data)
        data = {}
        if serializer.is_valid():
            result = serializer.save()
            print(result)
            data["Success"] = "update success"
            user_favorite.save()
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        user_favorite = self.get_object(pk)
        serializer = UserFavoritePokemonSerializer(user_favorite)
        return Response(serializer.data)

    
# @api_view(['GET', 'PUT'])
# def UserFavoritePokemonDetail(request, pk):

#     try:
#         user_favorite = UserFavoritePokemon.objects.get(pk=pk)
#     except UserFavoritePokemon.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = UserFavoritePokemonSerializer(user_favorite)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = UserFavoritePokemonSerializer(user_favorite, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

