from rest_framework import serializers
from api.models import Materiales_de_clase


class Materiales_de_claseRegisterSerializer(serializers.Serializer):
    asignacion = serializers.IntegerField()
    titulo = serializers.CharField(max_length=45)
    descripcion = serializers.CharField(style={'base_template':'textarea.html'},allow_blank=True, allow_null= True)
    archivo = serializers.FileField(allow_null= True)
   

class Materiales_de_claseSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Materiales_de_clase
        fields = (
            'id',
            'asignacion',                     
            'titulo',
            'descripcion',
            'archivo'
        )
        depth = 1