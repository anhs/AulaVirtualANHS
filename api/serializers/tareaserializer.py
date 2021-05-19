from rest_framework import serializers
from api.models import Tarea


class TareaRegisterSerializer(serializers.Serializer):
    asignacion = serializers.IntegerField()
    nombre = serializers.CharField(max_length=45)
    descripcion = serializers.CharField(style={'base_template':'textarea.html'},allow_blank=True, allow_null= True)
    archivo = serializers.FileField(allow_null= True)
    fecha_de_entrega = serializers.DateField()
    hora_de_entrega = serializers.TimeField()
    nota = serializers.FloatField()
   

class TareaSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Tarea
        fields = (
            'id',
            'asignacion',                     
            'nombre',
            'descripcion',
            'archivo',
            'fecha_de_entrega',
            'hora_de_entrega',
            'nota'
        )
        depth = 1