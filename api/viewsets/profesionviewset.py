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

from api.models import Profesion
from api.serializers import ProfesionRegisterSerializer, ProfesionSerializer


class ProfesionViewset(viewsets.ModelViewSet):
    queryset = Profesion.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profesion_name",)
    search_fields = ("profesion_name",)
    ordering_fields = ("profesion_name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProfesionSerializer
        else:
            return ProfesionRegisterSerializer

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
            adjunto = data.get("adjunto")
            data = json.loads(data["data"])

            print("data: ", data)
            print("adjunto: ", adjunto)
            serializer = ProfesionRegisterSerializer(data=data)
            if(serializer.is_valid()):
                Profesion.objects.create(
                    profesion_name = data.get("profesion_name"),
                    adjunto = File(adjunto),
                )
    
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            data = request.data
            adjunto = data.get("adjunto")
            data = json.loads(data["data"])
            
            print("Adjunto: ", adjunto)

            serializer = ProfesionRegisterSerializer(data=data)
            if(serializer.is_valid()):                
                profesion = Profesion.objects.get(pk=pk)
                
                if profesion.adjunto is not None and adjunto is not None:
                    profesion.adjunto.delete()

                profesion.profesion_name = data.get("profesion_name")
                
                if adjunto is not None:
                    profesion.adjunto = File(adjunto)

                profesion.save()
    
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)