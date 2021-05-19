from django.db import models

class Profesion(models.Model):
    profesion_name = models.CharField(max_length=25, null=True, blank=True)
    adjunto = models.FileField(upload_to='Adjuntos', null=True, blank=True)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        if self.adjunto is not None:
            self.adjunto.delete()
        self.save()        
        return True