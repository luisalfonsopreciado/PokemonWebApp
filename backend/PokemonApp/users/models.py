from django.db import models
from django.contrib.auth.models import AbstractUser
from PokemonApp.settings import AUTH_USER_MODEL

class CustomUser(AbstractUser):
    pass

class Pokemon(models.Model):
    idNum = models.IntegerField(default=0)
    name = models.CharField(max_length=120, default="")


    def __str__(self):
        return self.name

class UserFavoritePokemon(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    pokemon = models.ManyToManyField(Pokemon)

    def __str__(self):
        return self.user.email
