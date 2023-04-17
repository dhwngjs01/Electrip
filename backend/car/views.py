from django.shortcuts import render
from rest_framework import generics
from .models import Car
from .serializers import CarSerializer

# Create your views here.
class ListCar(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

""" @api_view(['GET', 'POST', 'DELETE'])
def car_list(request):
    if request.method == 'GET':
        cars = Car.objects.all()
        car_serializer = CarSerializer(cars, many=True)
        return JsonResponse(car_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        car_data = JSONParser().parse(request)
        car_serializer = CarSerializer(data=car_data)
        if car_serializer.is_valid():
            car_serializer.save()
            return JsonResponse(car_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(car_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Car.objects.all().delete()
        return JsonResponse({'message': '{} Cars were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT) """