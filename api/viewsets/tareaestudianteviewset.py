from api.serializers.tareaestudianteserializer import TareasestudianteReadSerializer
import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from django.db.models import Q, OuterRef, Exists

from api.models import Tarea, Tareasestudiante, Estudiante, tarea, tareasestudiante
from api.serializers import TareasestudianteSerializer, TareasestudianteRegisterSerializer, TareasestudianteReadSerializer


class TareasestudianteViewset(viewsets.ModelViewSet):
    queryset = Tareasestudiante.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante","tarea")
    search_fields = ("estudiante","tarea")
    ordering_fields = ("estudiante","tarea")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareasestudianteSerializer
        else:
            return TareasestudianteRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    def create(self, request):
        try:
            data = request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])

            print("data: ", data)
            print(archivo)
            serializer = TareasestudianteRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):

                    estudiante = Estudiante.objects.get(pk=data.get("estudiante"))
                    tarea = Tarea.objects.get(pk=data.get("tarea"))
                    Tareasestudiante.objects.create(
                        estudiante = estudiante,
                        tarea = tarea,
                        archivo = File(archivo),
                        text = data.get("text"),
                        nota_total = data.get("nota_total")
                    )
            
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            data = request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
            print(data)
            print("archivo: ", archivo)

            serializer = TareasestudianteRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):                
                    tarea = Tareasestudiante.objects.get(pk=pk)

                    estudiante = Estudiante.objects.get(pk=data.get("estudiante"))
                    tarea = Tarea.objects.get(pk=data.get("tarea"))
                    if tarea.archivo is not None and archivo is not None:
                        tarea.archivo.delete()

                    tarea.estudiante = estudiante
                    tarea.tarea = tarea
                    tarea.text = data.get("text")
                    tarea.nota_total = data.get("nota_total")
                    
                    if archivo is not None:
                        tarea.archivo = File(archivo)

                    tarea.save()
        
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tareas_enviadasporelestu(self, request, *args, **kwargs):
        try:
            user = request.user
            profile = user.profile_user
            estudiante = profile.estudiante_profile
            """print("ddddd",estudiante)"""
            asignacion = request.query_params.get("asignacion")
            """print("assa" , asignacion)"""
            tareas_enviadas= Tarea.objects.filter(
                asignacion__id=asignacion
            ).annotate(
                entregada=Exists(
                    Tareasestudiante.objects.filter(tarea__id=OuterRef('id'),estudiante=estudiante)
                )
            )

            page = self.paginate_queryset(tareas_enviadas) 
            if page is not None: 
                serializer = TareasestudianteReadSerializer(page, many=True) 
                return self.get_paginated_response(serializer.data)
            serializer = TareasestudianteReadSerializer(tareas_enviadas, many =True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)