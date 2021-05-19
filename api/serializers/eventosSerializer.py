from rest_framework import serializers
from api.models import Eventos


class EventosRegisterSerializer(serializers.Serializer):
    ciclo_escolar= serializers.IntegerField()
    titulo = serializers.CharField(max_length=45)
    descripcion = serializers.CharField(max_length=255)
    fecha = serializers.DateField()
    hora = serializers.TimeField()

class EventosSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Eventos
        fields = (
            'id',
            'ciclo_escolar',                     
            'titulo',
            'descripcion',
            'fecha',
            'hora'
        )
        depth = 1