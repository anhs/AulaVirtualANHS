from rest_framework import serializers
from api.models import Grado


class GradoRegisterSerializer(serializers.Serializer):
    nivel = serializers.IntegerField()
    nombre = serializers.CharField(max_length=45)
    descripcion = serializers.CharField(max_length=255)
   

class GradoSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Grado
        fields = (
            'id',
            'nivel',                     
            'nombre',
            'descripcion'
        )
        depth = 1