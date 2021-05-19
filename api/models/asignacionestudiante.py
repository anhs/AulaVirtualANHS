from django.db import models
from .asignacion import Asignacion
from .estudiante import Estudiante

class Asignacion_estudiante (models.Model):

    estudiante = models.ForeignKey(Estudiante,on_delete=models.CASCADE, related_name="asignacionestudiante_estudiante")
    asignacion = models.ForeignKey(Asignacion,on_delete=models.CASCADE, related_name="asignacionestudiante_asignacion")
