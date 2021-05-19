from django.db import models
from .profile import Profile


class Estudiante(models.Model):


    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="estudiante_profile")
    carnet = models.CharField(max_length=25)
    contacto = models.CharField(max_length=100, null=True, blank=True)
    direccion_contacto = models.CharField(max_length=255, null=True, blank=True)
    telefono_contacto = models.CharField(max_length=10, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete (self, *args):
        self.activo=False
        self.save()
