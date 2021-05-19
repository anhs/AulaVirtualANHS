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

from api.models import Materiales_de_clase, Asignacion
from api.serializers import Materiales_de_claseSerializer, Materiales_de_claseRegisterSerializer


class Materiales_de_claseViewset(viewsets.ModelViewSet):
    queryset = Materiales_de_clase.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("asignacion","titulo")
    search_fields = ("asignacion","titulo")
    ordering_fields = ("asigancion","titulo")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return Materiales_de_claseSerializer
        else:
            return Materiales_de_claseRegisterSerializer

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
            serializer = Materiales_de_claseRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):

                    asignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    Materiales_de_clase.objects.create(
                        asignacion = asignacion,
                        titulo = data.get("titulo"),
                        descripcion = data.get("descripcion"),
                        archivo = File(archivo),
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

            serializer = Materiales_de_claseRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):                
                    material_de_clase = Materiales_de_clase.objects.get(pk=pk)
                    asignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    if material_de_clase.archivo is not None and archivo is not None:
                        material_de_clase.archivo.delete()

                    material_de_clase.asignacion = asignacion
                    material_de_clase.titulo = data.get("titulo")
                    material_de_clase.descripcion = data.get("descripcion")
                    
                    if archivo is not None:
                        material_de_clase.archivo = File(archivo)

                    material_de_clase.save()
        
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def asignacion(self, request, *args, **kwargs):
        try:
            asignacion = request.query_params.get("asignacion")
            print(request.data)
            material = Materiales_de_clase.objects.filter(
                Q(activo=True)&
                Q(asignacion = asignacion)
            )
            print(asignacion)
            print(material)
            page = self.paginate_queryset(material) 
            if page is not None: 
                serializer = Materiales_de_claseSerializer(page, many=True) 
                return self.get_paginated_response(serializer.data)
            serializer = Materiales_de_claseSerializer(material, many= True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)