from django.urls import path
from .views import ItemListCreateView, ItemRetrieveUpdateDestroyView
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('items/<int:pk>/', ItemRetrieveUpdateDestroyView.as_view(),
         name='item-retrieve-update-destroy'),
    # path('items/', ItemListView.as_view(), name='item-list'),
    path('docs/', include_docs_urls(title='My API Documentation')),
]
