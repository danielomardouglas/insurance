from rest_framework import generics

from . import serializers, models, permissions


class ListCreateRiskTypeView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAdminUserOrReadOnly, )
    serializer_class = serializers.RiskTypeListSerializer
    queryset = models.RiskType.objects.all()


class RetrieveUpdateDestroyRiskTypeView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAdminUserOrReadOnly, )
    serializer_class = serializers.RiskTypeListSerializer
    queryset = models.RiskType.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = 'pk'
