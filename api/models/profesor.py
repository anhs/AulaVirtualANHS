from django.db import models
from .profesion import Profesion
from .profile import Profile

class Profesor(models.Model):
    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE, related_name="profesor_profesion")
    profile =  models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="profesor_profile")
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)