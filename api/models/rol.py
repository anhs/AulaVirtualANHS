from django.db import models

class Rol(models.Model):
    rol_name = models.CharField(max_length=30)    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.rol_name
