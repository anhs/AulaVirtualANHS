from django.db import models
from .cicloescolar import Ciclo_escolar


class Eventos(models.Model):

    ciclo_escolar= models.ForeignKey(Ciclo_escolar, on_delete=models.CASCADE, related_name="tareasestudiante_cicloescolar")
    titulo = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=255)
    fecha = models.DateField()
    hora=models.TimeField()

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()