from django.db import models
from .asignacion import Asignacion

class Materiales_de_clase (models.Model):

    asignacion = models.ForeignKey(Asignacion,on_delete=models.CASCADE, related_name="materialdeclase_asignacion")
    titulo = models.CharField(max_length=45)
    descripcion = models.TextField(null=True, blank=True)
    archivo = models.FileField(upload_to='Material_Didactico',null=True, blank=True)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete (self, *args):
        self.activo=False
        self.save()