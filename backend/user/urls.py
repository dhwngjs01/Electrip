from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('', views.ListUser.as_view()),
    path('<int:pk>/', views.DetailUser.as_view()),
    path('login', views.login),
]