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
from django.db.models import Q

from api.models import Tarea, Asignacion
from api.serializers import TareaSerializer, TareaRegisterSerializer


class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("asignacion","nombre")
    search_fields = ("asignacion","nombre")
    ordering_fields = ("asigancion","nombre")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareaSerializer
        else:
            return TareaRegisterSerializer

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
            serializer = TareaRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):

                    asignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    Tarea.objects.create(
                        asignacion = asignacion,
                        nombre = data.get("nombre"),
                        descripcion = data.get("descripcion"),
                        archivo = File(archivo),
                        fecha_de_entrega = data.get("fecha_de_entrega"),
                        hora_de_entrega = data.get("hora_de_entrega"),
                        nota = data.get("nota")
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

            serializer = TareaRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):                
                    tarea = Tarea.objects.get(pk=pk)
                    asignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    if tarea.archivo is not None and archivo is not None:
                        tarea.archivo.delete()

                    tarea.asignacion = asignacion
                    tarea.nombre = data.get("nombre")
                    tarea.descripcion = data.get("descripcion")
                    tarea.fecha_de_entrega = data.get("fecha_de_entrega")
                    tarea.hora_de_entrega = data.get("hora_de_entrega")
                    tarea.nota = data.get("nota")
                    
                    if archivo is not None:
                        tarea.archivo = File(archivo)

                    tarea.save()
        
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tareas_asignadas(self, request, *args, **kwargs):
        try:
            asignacion = request.query_params.get("asignacion")
            print(request.data)
            tarea = Tarea.objects.filter(
                Q(activo=True)&
                Q(asignacion__id = asignacion)
            )
            """print(asignacion)
            print(material)"""
            page = self.paginate_queryset(tarea) 
            if page is not None: 
                serializer = TareaSerializer(page, many=True) 
                return self.get_paginated_response(serializer.data)
            serializer = TareaSerializer(tarea, many= True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)