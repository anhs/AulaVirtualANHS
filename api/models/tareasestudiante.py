from django.db import models
from .tarea import Tarea
from .estudiante import Estudiante


class Tareasestudiante(models.Model):


    estudiante= models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name="tareasestudiante_estudiante")
    tarea= models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name="tareasestudiante_tarea")
    fecha_de_entrega = models.DateTimeField(auto_now_add=True)
    archivo = models.FileField(upload_to='Tarea_estudiantes', null=True, blank=True)
    text=models.TextField(null=True,blank=True)
    nota_total= models.FloatField(null=True,blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()