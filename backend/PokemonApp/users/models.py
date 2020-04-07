from django.db import models
from django.contrib.auth.models import AbstractUser
from PokemonApp.settings import AUTH_USER_MODEL

class CustomUser(AbstractUser):
    pass

class Pokemon(models.Model):
    idNum = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=120, default="")

    def __str__(self):
        return self.name

class UserFavoritePokemon(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    pokemon = models.ManyToManyField(Pokemon, blank=True)

    def __str__(self):
        return self.user.email
