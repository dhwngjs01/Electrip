from django.shortcuts import render
from rest_framework import generics
from .models import Reserve
from .serializers import ReserveSerializer

class ListReserve(generics.ListCreateAPIView):
    queryset = Reserve.objects.all()
    serializer_class = ReserveSerializer

class DetailReserve(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reserve.objects.all()
    serializer_class = ReserveSerializer