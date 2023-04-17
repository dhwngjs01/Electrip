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
        serializer = UserSerializer(data=data)

        if(serializer.is_valid()):
            return JsonResponse("로그인 성공")
        else:
            return JsonResponse("로그인 실패")
    else:
        return JsonResponse("{request.method} 잘못된 요청입니다.")

def signup(request):
    if(request.method == "POST"):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("회원가입 성공")
        return JsonResponse("회원가입 실패")
    else:
        return JsonResponse("{request.method} 잘못된 요청입니다.")