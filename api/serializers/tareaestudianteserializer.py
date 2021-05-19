from rest_framework import serializers
from api import models
from api.models import Tareasestudiante,Tarea


class TareasestudianteRegisterSerializer(serializers.Serializer):
    estudiante = serializers.IntegerField()
    tarea = serializers.IntegerField()
    archivo = serializers.FileField(allow_null= True)
    text = serializers.CharField(style={'base_template':'textarea.html'},allow_blank=True, allow_null= True)
    nota_total = serializers.FloatField(allow_null= True)

   

class TareasestudianteSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Tareasestudiante
        fields = (
            'id',
            'estudiante',                     
            'tarea',
            'archivo',
            'text',
            'fecha_de_entrega',
            'nota_total'
        )
        depth = 1


class TareasestudianteReadSerializer(serializers.ModelSerializer):
    entregada = serializers.BooleanField(default= False)
    mensaje = serializers.SerializerMethodField("getMensaje")
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
            'nota',
            'entregada',
            'mensaje'
        )

    def getMensaje(self, obj):
        """print("obj", obj.__dict__)
        print("nuevo", obj.entregada)
        obj.mensaje='blues'
        print("mensaje  ",obj.mensaje)"""
        try:
            if obj.entregada == True:
                return "Tarea entregada"
            else:
                return "Tarea No Entregada"
        except:
            return "Error"
