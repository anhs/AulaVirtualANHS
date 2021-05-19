from django.db import models
from .cicloescolar import Ciclo_escolar
from .grado import Grado
from .seccion import Seccion
from .curso import Curso
from .profesor import Profesor


class Asignacion (models.Model):

    ciclo_escolar = models.ForeignKey(Ciclo_escolar,on_delete=models.CASCADE, related_name="asignacion_cicloescolar")
    grado = models.ForeignKey(Grado,on_delete=models.CASCADE, related_name="asignacion_grado")
    seccion = models.ForeignKey(Seccion,on_delete=models.CASCADE, related_name="asignacion_seccion")
    curso = models.ForeignKey(Curso,on_delete=models.CASCADE, related_name="asignacion_curso")
    profesor = models.ForeignKey(Profesor,on_delete=models.CASCADE, related_name="asignacion_profesor")

    imagen_portada = models.ImageField(upload_to='Avatar', null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete (self, *args):
        self.activo=False
        self.save()