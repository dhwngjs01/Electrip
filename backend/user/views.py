from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import JSONParser

from .models import User
from .serializers import UserSerializer

class ListUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def login(request):
    if(request.method == "POST"):
        data = JSONParser().parse(request)
        search_user_id = data['user_id']
        obj = User.objects.get(user_id=search_user_id)

        if(data["password"] == obj.password):
            return JsonResponse("로그인 성공")
        else:
            return JsonResponse("로그인 실패")