from rest_framework import serializers
from .models import UserFavoritePokemon, Pokemon, CustomUser

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = '__all__'

class UserFavoritePokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoritePokemon
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'