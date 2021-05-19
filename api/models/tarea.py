from django.db import models
from .asignacion import Asignacion


class Tarea(models.Model):

    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name="tarea_asignacion")
    nombre = models.CharField(max_length=45)
    descripcion = models.TextField(null=True, blank=True)
    archivo = models.FileField(upload_to='Tarea_catedraticos', null=True, blank=True)
    fecha_de_entrega = models.DateField()
    hora_de_entrega = models.TimeField()
    nota=models.FloatField(null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()