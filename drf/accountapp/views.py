from rest_framework.decorators import api_view
from rest_framework.response import Response

# DRF 방식으로
@api_view()
def hello_world(request):
    return Response({ "message" : "Hello, World!" })