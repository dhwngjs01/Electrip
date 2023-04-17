from django.urls import path
from . import views

app_name = "reserve"

urlpatterns = [
    path('', views.ListReserve.as_view()),
    path('<int:pk>/', views.DetailReserve.as_view()),
]