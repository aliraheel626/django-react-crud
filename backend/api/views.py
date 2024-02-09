from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ItemSerializer  # Adjusted import for serializer
from base.models import Item  # Adjusted import for model
from rest_framework import generics
from rest_framework.documentation import include_docs_urls


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# @api_view(['GET'])
# def create(request):
#     obj = {'message': 'hello world'}
#     return Response(obj)


# @api_view(['GET'])
# def read(request):
#     obj = {'message': 'hello world'}
#     return Response(obj)


# @api_view(['GET'])
# def update(request):
#     obj = {'message': 'hello world'}
#     return Response(obj)


# @api_view(['GET'])
# def delete(request):
#     obj = {'message': 'hello world'}
#     return Response(obj)
